var SPEW_FORMAT = {
	REMAPPED_LABELS: {
		"age": {
			"label": "householder age",
			"use": "ages"
		},
		"hid": {
			"label": "household id"
		},
		"race": {
			"label": "householder race",
			"use": "races"
		},
		"persons": {
			"label": "size (occupants)"
		}
	},
	SPEW_US_FORMAT: {
		employments: {
			"null": "N/A (less than 16 years old)",
			//"1": "Civilian employed, at work",
			//"2": "Civilian employed, with a job but not at work",
			"1": "Civilian employed and working",
			"2": "Civilian employed but not working",
			"3": "Unemployed",
			//"4": "Armed forces, at work",
			//"5": "Armed forces, with a job but not at work",
			"4": "Armed forces and working",
			"5": "Armed forces with a job but not working",
			"6": "Not in labor force"
		},
		grades: {
			"null" : "Not attending school",
			"1" : "Nursery school/preschool",
			"2": "Kindergarten",
			"3": "Grade 1",
			"4": "Grade 2",
			"5": "Grade 3",
			"6": "Grade 4",
			"7": "Grade 5",
			"8": "Grade 6",
			"9": "Grade 7",
			"10": "Grade 8",
			"11": "Grade 9",
			"12": "Grade 10",
			"13": "Grade 11",
			"14": "Grade 12",
			"15": "College undergraduate years (freshman to senior)",
			"16": "Graduate or professional school beyond a bachelor’s degree"
		},
		incomes: {
			"null": "n/a or household only"
		},
		races: {
			"1": "White alone",
			"2": "Black or African American alone",
			"3": "American Indian alone",
			"4": "Alaska Native alone",
			//"5": "American Indian and Alaska Native tribes specified; or American .Indian or Alaska Native, not specified and no other races",
			"5": "American Indian & Alaska Native tribes specified or unspecified or no other races",
			"6": "Asian alone",
			//"7": "Native Hawaiian and Other Pacific Islander alone",
			"7": "Native Hawaiian & Other Pacific Islander alone",
			"8": "Some Other Race alone",
			"9": "Two or More Races"
		},
		relationships: {
			"0": "Reference person",
			"1": "Husband/wife",
			"2": "Biological son or daughter",
			"3": "Adopted son or daughter",
			"4": "Stepson or stepdaughter",
			"5": "Brother or sister",
			"6": "Father or mother",
			"7": "Grandchild",
			"8": "Parent-in-law",
			"9": "Son-in-law or daughter-in-law",
			"10": "Other relative",
			"11": "Roomer or boarder",
			"12": "Housemate or roommate",
			"13": "Unmarried partner 41",
			"14": "Foster child",
			"15": "Other nonrelative",
			"16": "Institutionalized group quarters population",
			"17": "Noninstitutionalized group quarters population"
		},
		schools: {
			"null": "(less than 3 years old)",
			//"1": "No, has not attended in the last 3 months",
			//"2": "Yes, public school or public college",
			//"3": "Yes, private school or college or home school"
			"1": "no school within 3 months",
			"2": "public school/college",
			"3": "private school/college or home school"
		},
		sexes: {
			"1": "male",
			"2": "female"
		}
	}
};
