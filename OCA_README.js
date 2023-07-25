const fs = require('fs').promises;
const JSZip = require('jszip');
const { text } = require('stream/consumers');


const path = '/Users/mugisha/Desktop/clone/ReadME/bundles/ff5b8d642dd2ec7d5307e8ecd9156ab9.zip';

async function ArrayOcaOverays(path) {
  try {
    const data = await fs.readFile(path);

    const zip = new JSZip();
    const contents = await zip.loadAsync(data);

    const jsonFiles = {};

    for (const filename of Object.keys(contents.files)) {
      const extension = filename.split('.').pop();

      if (extension === 'json') {
        const fileContent = await contents.files[filename].async('text');
        jsonFiles[filename] = fileContent;
      } else {
        console.log('Not a JSON file:', filename);
      }
    }

    const jsonFilesArray = Object.values(jsonFiles);
    return jsonFilesArray;
  } catch (err) {
    throw err;
  }
}


async function toTextFile(jsonFilesArray) {
  const textFile = [];
  const variablesArray = [];
  let Layer_name = null;
  let SAID = null;
 

  for (const jsonFile of jsonFilesArray) {
    const json = JSON.parse(jsonFile);
    const other_variables = {};

    for (const key in json) {
      if (key === "type") {
        const value = json[key];

        // Get the the layer_name from the type as the last two elements
        const split_type = value.split("/");
        const last_two_elements = split_type.slice(-2);
        Layer_name = last_two_elements.join("/");
      } else if (key === "digest") {
          SAID = json[key];
        } else if (key !== "capture_base") {
          let value = json[key];
          if (value !== null && value !== undefined && value !== []) {
            // Check if the value is empty
            if (Object.keys(value).length !== 0 || Array.isArray(value) && value.length !== 0) {
              // Push other key-value pairs to other_variables
              other_variables[key] = value;
            }
          }
        }
      }

 
    const variables = {
      Layer_name: Layer_name,
      SAID: SAID,
      ...other_variables,
  
    };
    variablesArray.push(variables);
  }

  // change the variablesArray to textFile
  for (const variable of variablesArray) {
    const text = JSON.stringify(variable, null, 2);

    // split the Layer_name using the slash and the first element is the layer name
    const split_layer_name = variable.Layer_name.split("/");
    const overlay_name = split_layer_name[0];


  
    // Remove curly brackets, double quotes, commas and colons
    const text_without_curly_brackets = text.replace(/[{()}]/g, '');
    const text_without_double_quotes = text_without_curly_brackets.replace(/"/g, '');
    const text_without_commas = text_without_double_quotes.replace(/,/g, '');
    const text_with_schema_attributes = text_without_commas.replace(/attribute/g, "Schema attribute");
    const text_with_schema_layer_name = text_with_schema_attributes.replace(/Layer_name:/g, "Layer name:");


      if (!textFile.includes(text_with_schema_layer_name)) {
        textFile.push(text_with_schema_layer_name);
      }

    textFile.push('*********************************************************');
  }

  

  const text = textFile.join('\n');

  const filename = 'Text_ReadMe.txt';
  await fs.writeFile(filename, text);


}

async function main() {
  const jsonFilesArray = await ArrayOcaOverays(path);
  await toTextFile(jsonFilesArray);
}

main();




  




