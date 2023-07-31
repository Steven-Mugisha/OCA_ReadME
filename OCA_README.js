const fs = require('fs').promises;
const JSZip = require('jszip');
const { text } = require('stream/consumers');



const path = '/Users/mugisha/Desktop/clone/ReadME/bundles/ff5b8d642dd2ec7d5307e8ecd9156ab9.zip';
// const path = '/Users/mugisha/Desktop/clone/ReadME/bundles/c84f6625f6c144bf25419bde579b5ef7.zip';

const readmeText = `
This is a human-readable format of an OCA schema
OCA_READ_ME/1.0
README SAID: xxxxxxxxxxxxxxxxxxxxxxxx

Reference for Overlays Capture Architecture (OCA): 
https://doi.org/10.5281/zenodo.7707467
Reference for OCA_READ_ME/1.0:
<when available>

In OCA, a schema consists of a capture_base which documents the attributes and their most basic features.
A schema may also contain overlays which add details to the capture_base.
For each overlay and capture_base, a hash of their original contents has been calculated and is reported here as the SAID value.

This READ ME format documents the capture_base and overlays that were associated together in a single OCA Bundle.
OCA_MANIFEST lists all components of the OCA Bundle.
For the OCA_BUNDLE, each section between rows of ****'s contains the details of one "layer type/version" of the OCA Bundle.\n\n`;


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

  // declare the variables
  const textFile = [];
  const variablesArray = [];
  let Manifest = [];
  let Layer_name = null;
  let SAID = null;

  for (const jsonFile of jsonFilesArray) {
    const other_variables = {}; // Object to store variables other than "Layer_name" and "SAID" for each overlay
    let hasFilesProperty = false; // Flag to check if "files" property is present
    const json = JSON.parse(jsonFile);
  
    if (json.hasOwnProperty("files")) {
      const files = json.files;
      const capture_base_key_value_pair = { capture_base: Object.keys(files) };
      const files_values = [capture_base_key_value_pair, ...Object.values(files)];
      Manifest.push(files_values);
      hasFilesProperty = true;
    }
  
    if (hasFilesProperty) {
      continue;
    }
  
    for (const key in json) {
      const value = json[key];
  
      if (key === "type") {
        const split_type = value.split("/");
        Layer_name = split_type.slice(-2).join("/");
      } else if (key === "digest") {
        SAID = value;
      } else if (key !== "capture_base" && value != null) {
        if (Object.keys(value).length !== 0 || (Array.isArray(value) && value.length !== 0)) {
          other_variables[key] = value;
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
  
  // turning OCA bundle into OCA readme starts here
  // here we push the values to the text file 
  textFile.push(
    readmeText,
    "BEGIN_OCA_MANIFEST\n",
    "************************************************************\n",
    "Bundle SAID: XXXXXXXXXX\n\n"
  );

  // the OCA manifest
  const manifest_string = JSON.stringify(Manifest,null,0);
  const cleaned_manifest = manifest_string.replace(/[\[\]{}]/g, '').replace(/\n/g, '').replace(/,/g, ',\n').replace(/:/g, ' SAID: ');
  textFile.push(
    cleaned_manifest,
    "\n",
    "************************************************************\n",
    "END_OCA_MANIFEST\n\n",
    "BEGIN_OCA_BUNDLE\n",
    "************************************************************"
  );


  variablesArray.forEach((variable) => {
    const schema_overlay_name = variable.Layer_name
    const text = JSON.stringify(variable, null, 3);

    // Remove curly brackets, double quotes, and colons
    const text_without_curly_brackets = text.replace(/[{}]/g, '');
    const text_without_double_quotes = text_without_curly_brackets.replace(/"/g, '');

    // Remove commas only for strings not enclosed in square brackets
    const result = text_without_double_quotes.replace(/(\[[^\]]*\]|[^[\],]+),?/g, (match, group) => {
      if (match.includes('[') && match.includes(']')) {
        // If enclosed in square brackets, keep it on the same line and remove inner whitespaces
        return group.replace(/\n/g, '').replace(/\s+/g, '');
      } else {
        return group.replace(/,/g, ''); // Otherwise, remove the commas
      }
    });
  
    const text_with_schema_attributes = result.replace(/\b.*attribute.*\b/g, `Schema attribute: ${schema_overlay_name}`);

    const text_with_schema_layer_name = text_with_schema_attributes.replace(/Layer_name:/g, "Layer name:");
  
    if (!textFile.includes(text_with_schema_layer_name)) {
      textFile.push(text_with_schema_layer_name);
      textFile.push("************************************************************");
    }
  });
  

  

  
  
  

  const text = textFile.join('');

  const filename = 'Text_ReadMe.txt';
  await fs.writeFile(filename, text);


}


async function main() {
  const jsonFilesArray = await ArrayOcaOverays(path);
  await toTextFile(jsonFilesArray);
}

main();




  




