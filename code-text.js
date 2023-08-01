function transformObject(obj) {
  const result = {};
  for (const key in obj) {
    let newKey = key;
    if (key !== 'flagged_attributes') {
      if (key.includes('attribute') || key.includes('attributes') || key === 'attr') {
        newKey = 'Schema attribute';
      }
    }
    result[newKey] = obj[key];
  }
  return result;
}

// Example usage:
const originalObject = {
  Layer_name: 'character_encoding/1.0',
  SAID: 'ElUDy-ub9i2RXxFiyIRG65ORzEL1ax4hb5S0ZHHbMv38',
  default_character_encoding: 'utf-8',
  attribute_character_encoding: { Color: 'utf-8', Series: 'utf-8', Year_of_purchase: 'utf-8' },
  flagged_attributes: 'Some flagged data'
};

const transformedObject = transformObject(originalObject);
console.log(transformedObject);
