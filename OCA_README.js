const fs = require('fs').promises;
const JSZip = require('jszip');
const { text } = require('stream/consumers');



const path = '/Users/mugisha/Desktop/clone/ReadME/bundles/ff5b8d642dd2ec7d5307e8ecd9156ab9.zip';
// const path = '/Users/mugisha/Desktop/clone/ReadME/bundles/c84f6625f6c144bf25419bde579b5ef7.zip';

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
  const JSONoverlays = [];
  let Layer_name = null;
  let SAID = null;
  let Manifest = [];
  let Meta_json = null;
 

  for (const jsonFile of jsonFilesArray) {
    const json = JSON.parse(jsonFile);
    if (json.hasOwnProperty("files")) {
      Meta_json = json;
    } else {
      JSONoverlays.push(json);
    }
    const other_variables = {};


    // // preparing the manifest
    // for (const key in json) {

    //   if (key === "files") {
    //     const values = json[key];
    //     const files_values = Object.values(values);
    //     const files_key = Object.keys(values);
    //     const files_key_string = files_key.toString();

    //     // create a new key value pair for this files keys and make the key capture_base and the value the files_keys
    //     const capture_base_key_value_pair = {capture_base: files_key_string };

    //     // push the capture_base_key_value_pair to the files_values as the first element
    //     files_values.unshift(capture_base_key_value_pair);
    //     Manifest.push(files_values); 
    //   }
    // }


    // preparing the body of the OCA readme
    for (const key in json) {

      if (key === "type") {
        const value = json[key];
        // get the the layer_name from the type as the last two elements
        const split_type = value.split("/");
        const last_two_elements = split_type.slice(-2);
        Layer_name = last_two_elements.join("/");
      } else if (key === "digest") {
          SAID = json[key];
        } else if (key !== "capture_base") {
          let value = json[key];
          if (value !== null && value !== undefined && value !== []) {
            // check if the value is empty
            if (Object.keys(value).length !== 0 || Array.isArray(value) && value.length !== 0) {
              // push other key-value pairs to other_variables
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

  // here we push the values to the text file 
  textFile.push("BEGIN_OCA_MANIFEST\n");
  textFile.push("************************************************************\n");
  textFile.push("Bundle SAID: XXXXXXXXXX\n\n");


  
  // the OCA manifest
  const Meta_values = Object.values(Meta_json);
  const capture_key = Object.keys(Meta_values);
  const caputer_key_string = capture_key.toString();

  const capture_base_key_value_pair = {capture_base: caputer_key_string };
  Meta_values.unshift(capture_base_key_value_pair);

  Manifest.push(Meta_values); 

  const manifest_string = JSON.stringify(Manifest,null,0.5);



  // console.log(manifest_string);

  // const trimmed_string = manifest_string.replace(/[\[\]']+/g, '');
  const manifest_without_square_brackets = manifest_string.replace(/[\[\]']+/g, '');
  const manifest_without_curly_brackets = manifest_without_square_brackets.replace(/[{}]/g, '');
  const manifest_without_linebreaks = manifest_without_curly_brackets.replace(/\n/g, '');
  const manifest_with_linebreaks = manifest_without_linebreaks.replace(/,/g, ',\n');
  const manifest_without_commas = manifest_with_linebreaks.replace(/,/g, '');
  const manifest_with_SAID = manifest_without_commas.replace(/:/g, " SAID: ");


  textFile.push(manifest_with_SAID);
  textFile.push("\n")
  textFile.push("************************************************************\n");
  textFile.push("END_OCA_MANIFEST\n\n");
  textFile.push("BEGIN_OCA_BUNDLE\n");
  textFile.push("************************************************************")




  // change the variablesArray to textFile
  for (const variable of variablesArray) {
    const text = JSON.stringify(variable, null, 2);

    // split the Layer_name using the slash and the first element is the layer name
    const split_layer_name = variable.Layer_name.split("/");
    const overlay_name = split_layer_name[0];

    // Remove curly brackets, double quotes, commas and colons
    const text_without_curly_brackets = text.replace(/[{}]/g, '');
    const text_without_double_quotes = text_without_curly_brackets.replace(/"/g, '');
    const text_without_commas = text_without_double_quotes.replace(/,/g, '');
    const text_with_schema_attributes = text_without_commas.replace(/attribute/g, "Schema attribute");
    const text_with_schema_layer_name = text_with_schema_attributes.replace(/Layer_name:/g, "Layer name:");


    if (!textFile.includes(text_with_schema_layer_name)) {
      textFile.push(text_with_schema_layer_name);
      textFile.push("************************************************************\n");
    
    }
  }

  const text = textFile.join('');

  const filename = 'Text_ReadMe.txt';
  await fs.writeFile(filename, text);


}



async function main() {
  const jsonFilesArray = await ArrayOcaOverays(path);
  await toTextFile(jsonFilesArray);
}

main();




  




