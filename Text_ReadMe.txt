
  Layer name: capture_base/1.0
  SAID: EVnvZJj9NrgJcyjB9Hltx6r1w1fi20mVG23vv7eI2sC8
  classification: CRDC:RDF40
  Schema attributes: 
    analysisDate: DateTime
    collectionDate: DateTime
    insectCount: Numeric
    insectType: Numeric
    insectWeight: Array[Numeric]
    location: Text
  

*********************************************************

  Layer name: character_encoding/1.0
  SAID: ETCBOek8JY83XCtZTOUyXlcnTczEdytLp-xpC7eDGRGY
  default_character_encoding: utf-8
  Schema attribute_character_encoding: 
    analysisDate: utf-8
    collectionDate: utf-8
    insectCount: utf-8
    insectType: utf-8
    insectWeight: utf-8
    location: utf-8
  

*********************************************************

  Layer name: format/1.0
  SAID: ESxH42FcC2WcnWrJHIeuXr55MoS9EWGl8PUiA-SwTwok
  Schema attribute_formats: 
    analysisDate: YYYY-MM-DD
    collectionDate: YYYY-MM-DD
    insectCount: -?\\d+?:\\.\\d*|-?[0-9]*
    insectType: -?\\d+?:\\.\\d*|-?[0-9]*
    insectWeight: -?\\d+?:\\.\\d*|-?[0-9]*
    location: [^]*
  

*********************************************************

  Layer name: label/1.0
  SAID: EEx61pSoWiYrfcqavqh3xQl-WVGB9MAgOFRVCqXbUKjY
  language: en
  Schema attribute_labels: 
    analysisDate: Date of Analysis
    collectionDate: Date of Collection
    insectCount: Insect Count
    insectType: Insect Type
    insectWeight: Insect Weights
    location: Campus location
  

*********************************************************

  Layer name: information/1.0
  SAID: E0P9nrVxglX0G0nQxqUUT2M_-gUUAO-Il3zVBDfD-W4E
  language: en
  Schema attribute_information: 
    analysisDate: Data of analysis of samples all in a single day
    collectionDate: Date of sample collection
    insectCount: number of specified honeybees
    insectType: species of honeybee counted and weighed
    insectWeight: weights of honebees that were weighed: note not every collected bee was weighed
    location: Campus location where the samples were collected on the date of sample collection
  

*********************************************************

  Layer name: entry_code/1.0
  SAID: E3PGUpSlSQDrmDabXs4_neknGV-5eLYD-5VstMOBimRM
  Schema attribute_entry_codes: 
    insectType: [
      501
      527
    ]
    location: [
      BAFF
      TH
    ]
  

*********************************************************

  Layer name: entry/1.0
  SAID: EJUu256bPq40VO1IpbAyKDlErOZFbix141GerLcOfgh4
  language: en
  Schema attribute_entries: 
    insectType: 
      501: Carniolan honey bee
      527: Russian honey bee
    
    location: 
      BAFF: Bedrock Aquifer Field Facility
      TH: Townsend House
    
  

*********************************************************

  Layer name: unit/1.0
  SAID: E_XuB6gNgVuOjy2pHQvD6wz1KZy8SPUsVTjxYiH0b250
  Schema attribute_units: 
    insectWeight: mg
  

*********************************************************

  Layer name: meta/1.0
  SAID: EKBw_KVlzdxI6tvopUHwdUc2DhmMrGWaZ3h7q1pWi-nA
  language: en
  name: Insect Counting
  description: A schema for insect counts developed at the University of Guelph as an ADC test schema

*********************************************************

  Layer name: meta/1.0
  SAID: EKBw_KVlzdxI6tvopUHwdUc2DhmMrGWaZ3h7q1pWi-nA
  files: 
    EVnvZJj9NrgJcyjB9Hltx6r1w1fi20mVG23vv7eI2sC8: 
      character_encoding: ETCBOek8JY83XCtZTOUyXlcnTczEdytLp-xpC7eDGRGY
      entry en: EJUu256bPq40VO1IpbAyKDlErOZFbix141GerLcOfgh4
      entry_code: E3PGUpSlSQDrmDabXs4_neknGV-5eLYD-5VstMOBimRM
      format: ESxH42FcC2WcnWrJHIeuXr55MoS9EWGl8PUiA-SwTwok
      information en: E0P9nrVxglX0G0nQxqUUT2M_-gUUAO-Il3zVBDfD-W4E
      label en: EEx61pSoWiYrfcqavqh3xQl-WVGB9MAgOFRVCqXbUKjY
      meta en: EKBw_KVlzdxI6tvopUHwdUc2DhmMrGWaZ3h7q1pWi-nA
      unit: E_XuB6gNgVuOjy2pHQvD6wz1KZy8SPUsVTjxYiH0b250
    
  
  root: EVnvZJj9NrgJcyjB9Hltx6r1w1fi20mVG23vv7eI2sC8

*********************************************************