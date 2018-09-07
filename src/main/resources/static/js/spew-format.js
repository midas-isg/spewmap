var SPEW_FORMAT = {
	SINGULAR_MAPPINGS: {
		"Ages": "Age",
		"Races": "Race",
		"Sexes": "Sex",
		"Grades": "Grade",
		"Incomes": "Income",
		"Schools": "School",
		"Employments": "Employment",
		"Relationships": "Relationship"
	},
	REMAPPED_LABELS: {
		//Human Readable Singular Mappings
		"age": {
			"label": "Householder Age",
			"use": "ages"
		},
		"hid": {
			"label": "Household ID"
		},
		"persons": {
			"label": "Size (Occupants)"
		},
		"puma": {
			"label": "PUMA"
		},
		"race": {
			"label": "Householder Race",
			"use": "races"
		},
		"serialno": {
			"label": "Serial #"
		},
		
		//SPEW Format Mappings
		"AGE" : {
			"label": "Age"
		},
		"AGEP" : {
			"label": "Age"
		},
		"COUNTRY" : {
			"label": "Country"
		},
		"ESR" : {
			"label": "Employment"
		},
		"HINCP" : {
			"label": "Household Income"
		},
		"HHTYPE": {
			"label": "Household Type"
		},
		"INCTOT":{
			"label": "Income"
		},
		"NP" : {
			"label": "Size (Occupants)"
		},
		"PERNUM": {
			"label": "Person ID"
		},
		"PERSONS": {
			"label": "Size (Occupants)"
		},
		"place_id" : {
			"label": "Place ID"
		},
		"puma_id": {
			"label": "PUMA"
		},
		"RAC1P" : {
			"label": "Race"
		},
		"RACE": {
			"label": "Race"
		},
		"RELP" : {
			"label": "Relationship"
		},
		"SCH" : {
			"label": "School"
		},
		"SCHG" : {
			"label": "Grade"
		},
		"SCHOOL" : {
			"label": "School"
		},
		"school_id" : {
			"label": "School ID"
		},
		"SERIALNO":{
			"label": "Serial #"
		},
		"SEX" : {
			"label": "Sex"
		},
		"SYNTHETIC_HID" : {
			"label": "Household ID"
		},
		"SYNTHETIC_PID" : {
			"label": "Person ID"
		},
		"workplace_id":{
			"label": "Workplace ID"
		},
		"YEAR" : {
			"label": "Year"
		}
	},
	CODES: {
		"ages": "AGE",
		"puma": "puma_id",
		"year": "YEAR",
		"races": "RAC1P",
		"sexes": "SEX",
		"grades": "SCHG",
		"hid": "SYNTHETIC_HID",
		"income": "HINCP",
		"region": "place_id",
		"country": "COUNTRY",
		"incomes": "INCTOT",
		"persons": "NP",
		"schools": "SCH",
		"serialno": "SERIALNO",
		"employments": "ESR",
		"relationships": "RELP"
	},
	SPEW_US_FORMAT: {
		ESR: {
			"null": {
				"original": "N/A (less than 16 years old)",
				"concise": "N/A (less than 16 years old)"
			},
			"1": {
				"original": "Civilian employed, at work",
				"concise": "Civilian employed & working"
			},
			"2": {
				"original": "Civilian employed, with a job but not at work",
				"concise": "Civilian employed but not working"
			},
			"3": {
				"original": "Unemployed",
				"concise": "Unemployed"
			},
			"4": {
				"original": "Armed forces, at work",
				"concise": "Armed forces & working"
			},
			"5": {
				"original": "Armed forces, with a job but not at work",
				"concise": "Armed forces with a job but not working"
			},
			"6": {
				"original": "Not in labor force",
				"concise": "Not in labor force"
			}
		},
		SCHG: {
			"null" : {
				"original": "Not attending school",
				"concise": "Not attending school"
			},
			"1" : {
				"original": "Nursery school/preschool",
				"concise": "Nursery school/preschool"
			},
			"2": {
				"original": "Kindergarten",
				"concise": "Kindergarten"
			},
			"3": {
				"original": "Grade 1",
				"concise": "Grade 1"
			},
			"4": {
				"original": "Grade 2",
				"concise": "Grade 2"
			},
			"5": {
				"original": "Grade 3",
				"concise": "Grade 3"
			},
			"6": {
				"original": "Grade 4",
				"concise": "Grade 4"
			},
			"7": {
				"original": "Grade 5",
				"concise": "Grade 5"
			},
			"8": {
				"original": "Grade 6",
				"concise": "Grade 6"
			},
			"9": {
				"original": "Grade 7",
				"concise": "Grade 7"
			},
			"10": {
				"original": "Grade 8",
				"concise": "Grade 8"
			},
			"11": {
				"original": "Grade 9",
				"concise": "Grade 9"
			},
			"12": {
				"original": "Grade 10",
				"concise": "Grade 10"
			},
			"13": {
				"original": "Grade 11",
				"concise": "Grade 11"
			},
			"14": {
				"original": "Grade 12",
				"concise": "Grade 12"
			},
			"15": {
				"original": "College undergraduate years (freshman to senior)",
				"concise": "College undergraduate years (freshman to senior)"
			},
			"16": {
				"original": "Graduate or professional school beyond a bachelor’s degree",
				"concise": "Graduate or professional school beyond a bachelor’s degree"
			}
		},
		incomes: {
			"null": {
				"concise": "N/A" // original value not provided
			}
		},
		RAC1P: {
			"1": {
				"original": "White alone",
				"concise": "White"
			},
			"2": {
				"original": "Black or African American alone",
				"concise": "Black"
			},
			"3": {
				"original": "American Indian alone",
				"concise": "American Indian"
			},
			"4": {
				"original": "Alaska Native alone",
				"concise": "Alaska Native"
			},
			"5": {
				"original": "American Indian and Alaska Native tribes specified; or American .Indian or Alaska Native, not specified and no other races",
				"concise": "American Indian & Alaska Native tribes specified or unspecified or no other races"
			},
			"6": {
				"original": "Asian alone",
				"concise": "Asian"
			},
			"7": {
				"original": "Native Hawaiian and Other Pacific Islander alone",
				"concise": "Native Hawaiian & other Pacific Islander"
			},
			"8": {
				"original": "Some Other Race alone",
				"concise": "Other"
			},
			"9": {
				"original": "Two or More Races",
				"concise": "Multiracial"
			}
		},
		RELP: {
			"0": {
				"original": "Reference person",
				"concise": "Reference person"
			},
			"1": {
				"original": "Husband/wife",
				"concise": "Husband/wife"
			},
			"2": {
				"original": "Biological son or daughter",
				"concise": "Biological son or daughter"
			},
			"3": {
				"original": "Adopted son or daughter",
				"concise": "Adopted son or daughter"
			},
			"4": {
				"original": "Stepson or stepdaughter",
				"concise": "Stepson or stepdaughter"
			},
			"5": {
				"original": "Brother or sister",
				"concise": "Brother or sister"
			},
			"6": {
				"original": "Father or mother",
				"concise": "Father or mother"
			},
			"7": {
				"original": "Grandchild",
				"concise": "Grandchild"
			},
			"8": {
				"original": "Parent-in-law",
				"concise": "Parent-in-law"
			},
			"9": {
				"original": "Son-in-law or daughter-in-law",
				"concise": "Son-in-law or daughter-in-law"
			},
			"10": {
				"original": "Other relative",
				"concise": "Other relative"
			},
			"11": {
				"original": "Roomer or boarder",
				"concise": "Roomer or boarder"
			},
			"12": {
				"original": "Housemate or roommate",
				"concise": "Housemate or roommate"
			},
			"13": {
				"original": "Unmarried partner 41",
				"concise": "Unmarried partner"
			},
			"14": {
				"original": "Foster child",
				"concise": "Foster child"
			},
			"15": {
				"original": "Other nonrelative",
				"concise": "Other nonrelative"
			},
			"16": {
				"original": "Institutionalized group quarters population",
				"concise": "Institutionalized group quarters population",
			},
			"17": {
				"original": "Noninstitutionalized group quarters population",
				"concise": "Noninstitutionalized group quarters population"
			}
		},
		SCH: {
			"null": {
				"original": "(less than 3 years old)",
				"concise": "(less than 3 years old)"
			},
			"1": {
				"original": "No, has not attended in the last 3 months",
				"concise": "No school within 3 months"
			},
			"2": {
				"original": "Yes, public school or public college",
				"concise": "Public school/college"
			},
			"3": {
				"original": "Yes, private school or college or home school",
				"concise": "Private school/college or home school"
			}
		}
	},
	SPEW_IPUMS_FORMAT: {
		COUNTRY: {
			"124" : {
				"original": "124",
				"concise": "CAN"
			},
			"242" : {
				"original": "242",
				"concise": "FIJI"
			},
			"840" : {
				"original": "840",
				"concise": "USA"
			}
		},
		HHTYPE: {
			null:{
				"original": "No data reported",
				"concise": "No data reported"
			},
			"0": {
				"original": "Vacant household",
				"concise": "Vacant household"
			},
			"1": {
				"original": "One-person household",
				"concise": "One-person household"
			},
			"2": {
				"original": "Married/cohab couple, no children",
				"concise": "Married/cohab couple without children"
			},
			"3": {
				"original": "Married/cohab couple with children",
				"concise": "Married/cohab couple with children"
			},
			"4": {
				"original": "Single-parent family",
				"concise": "Single-parent family"
			},
			"5": {
				"original": "Polygamous family",
				"concise": "Polygamous family"
			},
			"6": {
				"original": "Extended family, relatives only",
				"concise": "Extended family of relatives only"
			},
			"7": {
				"original": "Composite household, family and non-relatives",
				"concise": "Composite household of family and non-relatives"
			},
			"8": {
				"original": "Non-family household",
				"concise": "Non-family household"
			},
			"9": {
				"original": "Unclassified subfamily",
				"concise": "Unclassified subfamily"
			},
			"10": {
				"original": "Other relative or non-relative household",
				"concise": "Other relative or non-relative household"
			},
			"11": {
				"original": "Group quarters",
				"concise": "Group quarters"
			},
			"99": {
				"original": "Unclassifiable",
				"concise": "Unclassifiable"
			}
		},
		RACE: {
			null: {
				"original": "No data reported",
				"concise": "No data reported"
			},
			"10": {
				"original": "White",
				"concise": "White"
			},
			"20": {
				"original": "Black",
				"concise": "Black"
			},
			"30": {
				"original": "Indigenous",
				"concise": "Indigenous"
			},
			"40": {
				"original": "Asian",
				"concise": "Asian"
			},
			"50": {
				"original": "Mixed race",
				"concise": "Mixed race"
			},
			"60": {
				"original": "Other",
				"concise": "Other"
			}
		},
		SCHOOL: {
			"0": {
				"original": "NIU (not in universe)",
				"concise": "NIU (not in universe)"
			},
			"1": {
				"original": "Yes",
				"concise": "Yes"
			},
			"2": {
				"original": "No, not specified",
				"concise": "No or unspecified"
			},
			"3": {
				"original": "No, attended in past",
				"concise": "Not currently attending"
			},
			"4": {
				"original": "No, never attended",
				"concise": "Never attended"
			},
			"9": {
				"original": "Unknown/missing",
				"concise": "Unknown/missing"
			}
		},
		SEX: {
			"1": {
				"original": "Male",
				"concise": "Male"
			},
			"2": {
				"original": "Female",
				"concise": "Female"
			},
			"9": {
				"original": "Unknown",
				"concise": "Unknown"
			}
		}
	}
};
