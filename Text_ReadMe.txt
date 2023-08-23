
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
For the OCA_BUNDLE, each section between rows of ****'s contains the details of one "layer type/version" of the OCA Bundle.

BEGIN_OCA_MANIFEST
************************************************************
Bundle SAID: XXXXXXXXXX

"capture_base" SAID: "ERlDuDCpVUqGA2nBsWs8N41MaxZEdJt5FGQcVELLv038",
"character_encoding" SAID: "ElUDy-ub9i2RXxFiyIRG65ORzEL1ax4hb5S0ZHHbMv38",
"information (en)" SAID: "ErXuoOoIh1QM_Udf25wDHgD8fj-eZAsZNNM0FRi8WgIk",
"label (en)" SAID: "EpQGJvWUKdlZGGhy5b-BsF-RlVnL-paWPs1-6eRMG_Mk",
"meta (en)" SAID: "EKRwsBTPFG9rT8ULAruDEVFZH1ueYQteZQzMKuc6jM1o",
"unit" SAID: "ER-NIAB7GhtK6Hjuza0fYHEvTvulUqavvO3A_MiAjDIA"
************************************************************
END_OCA_MANIFEST

BEGIN_OCA_BUNDLE
************************************************************
Layer name: capture_base/1.0
SAID: ERlDuDCpVUqGA2nBsWs8N41MaxZEdJt5FGQcVELLv038
classification: RDF212
flagged_attributes: [Color,Series,Year_of_purchase]

Schema attribute: capture_base/1.0 
   Color: Text
   Series: Text
   Year_of_purchase: Text

************************************************************
Layer name: character_encoding/1.0
SAID: ElUDy-ub9i2RXxFiyIRG65ORzEL1ax4hb5S0ZHHbMv38
default_character_encoding: utf-8

Schema attribute: character_encoding/1.0 
   Color: utf-8
   Series: utf-8
   Year_of_purchase: utf-8

************************************************************
Layer name: unit/1.0
SAID: ER-NIAB7GhtK6Hjuza0fYHEvTvulUqavvO3A_MiAjDIA
************************************************************
Layer name: label/1.0
SAID: EpQGJvWUKdlZGGhy5b-BsF-RlVnL-paWPs1-6eRMG_Mk
language: en
************************************************************
Layer name: information/1.0
SAID: ErXuoOoIh1QM_Udf25wDHgD8fj-eZAsZNNM0FRi8WgIk
language: en
************************************************************
Layer name: meta/1.0
SAID: EKRwsBTPFG9rT8ULAruDEVFZH1ueYQteZQzMKuc6jM1o
language: en
name: Iphones
************************************************************
END_OCA_BUNDLE