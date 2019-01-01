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
			"label": "Household Income",
			"use": "INCTOT"
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
		"PERSONS": "NP",
		"schools": "SCH",
		"serialno": "SERIALNO",
		"employments": "ESR",
		"relationships": "RELP"
		
		/*
		"AGE": "ages",
		"puma_id": "puma",
		"YEAR": "year",
		"RAC1P": "races",
		"SEX": "sexes",
		"SCHG": "grades",
		"SYNTHETIC_HID": "hid",
		"HINCP": "income",
		"place_id": "region",
		"COUNTRY": "country",
		"INCTOT": "incomes",
		"NP": "PERSONS",
		"SCH": "schools",
		"SERIALNO": "serialno",
		"ESR": "employments",
		"RELP": "relationships"
		*/
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
			null: {
				"original": "null",
				"concise": "N/A"
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
			"4": {"original": "Afghanistan", "concise": "AF"},
			"8": {"original": "Albania", "concise": "AL"},
			"12": {"original": "Algeria", "concise": "DZ"},
			"20": {"original": "Andorra", "concise": "AD"},
			"24": {"original": "Angola", "concise": "AO"},
			"660": {"original": "Anguilla", "concise": "AI"},
			"10": {"original": "Antarctica", "concise": "AQ"},
			"28": {"original": "Antigua and Barbuda", "concise": "AG"},
			"32": {"original": "Argentina", "concise": "AR"},
			"51": {"original": "Armenia", "concise": "AM"},
			"533": {"original": "Aruba", "concise": "AW"},
			"36": {"original": "Australia", "concise": "AU"},
			"40": {"original": "Austria", "concise": "AT"},
			"31": {"original": "Azerbaijan", "concise": "AZ"},
			"44": {"original": "Bahamas", "concise": "BS"},
			"48": {"original": "Bahrain", "concise": "BH"},
			"50": {"original": "Bangladesh", "concise": "BD"},
			"52": {"original": "Barbados", "concise": "BB"},
			"112": {"original": "Belarus", "concise": "BY"},
			"56": {"original": "Belgium", "concise": "BE"},
			"84": {"original": "Belize", "concise": "BZ"},
			"204": {"original": "Benin", "concise": "BJ"},
			"60": {"original": "Bermuda", "concise": "BM"},
			"64": {"original": "Bhutan", "concise": "BT"},
			"68": {"original": "Bolivia", "concise": "BO"},
			"70": {"original": "Bosnia and Herzegovina", "concise": "BA"},
			"72": {"original": "Botswana", "concise": "BW"},
			"74": {"original": "Bouvet Island", "concise": "BV"},
			"76": {"original": "Brazil", "concise": "BR"},
			"86": {"original": "British Indian Ocean Territory", "concise": "IO"},
			"92": {"original": "British Virgin Islands", "concise": "VG"},
			"96": {"original": "Brunei Darussalam", "concise": "BN"},
			"100": {"original": "Bulgaria", "concise": "BG"},
			"854": {"original": "Burkina Faso", "concise": "BF"},
			"108": {"original": "Burundi", "concise": "BI"},
			"116": {"original": "Cambodia", "concise": "KH"},
			"120": {"original": "Cameroon", "concise": "CM"},
			"124": {"original": "Canada", "concise": "CA"},
			"132": {"original": "Cape Verde", "concise": "CV"},
			"136": {"original": "Cayman Islands", "concise": "KY"},
			"140": {"original": "Central African Republic", "concise": "CF"},
			"148": {"original": "Chad", "concise": "TD"},
			"152": {"original": "Chile", "concise": "CL"},
			"156": {"original": "China", "concise": "CN"},
			"162": {"original": "Christmas Island", "concise": "CX"},
			"166": {"original": "Cocos Islands", "concise": "CC"},
			"170": {"original": "Colombia", "concise": "CO"},
			"174": {"original": "Comoros (the)", "concise": "KM"},
			"180": {"original": "Congo (the Democratic Republic of the)", "concise": "CD"},
			"178": {"original": "Congo (the)", "concise": "CG"},
			"184": {"original": "Cook Islands", "concise": "CK"},
			"188": {"original": "Costa Rica", "concise": "CR"},
			"191": {"original": "Croatia", "concise": "HR"},
			"192": {"original": "Cuba", "concise": "CU"},
			"531": {"original": "Curacao", "concise": "CW"},
			"196": {"original": "Cyprus", "concise": "CY"},
			"203": {"original": "Czech Republic", "concise": "CZ"},
			"384": {"original": "CÃ´te d'Ivoire", "concise": "CI"},
			"208": {"original": "Denmark", "concise": "DK"},
			"262": {"original": "Djibouti", "concise": "DJ"},
			"214": {"original": "Dominican Republic", "concise": "DO"},
			"212": {"original": "Dominica", "concise": "DM"},
			"218": {"original": "Ecuador", "concise": "EC"},
			"818": {"original": "Egypt", "concise": "EG"},
			"222": {"original": "El Salvador", "concise": "SV"},
			"226": {"original": "Equatorial Guinea", "concise": "GQ"},
			"232": {"original": "Eritrea", "concise": "ER"},
			"233": {"original": "Estonia", "concise": "EE"},
			"231": {"original": "Ethiopia", "concise": "ET"},
			"238": {"original": "Falkland Islands", "concise": "FK"},
			"234": {"original": "Faroe Islands", "concise": "FO"},
			"242": {"original": "Fiji", "concise": "FJ"},
			"246": {"original": "Finland", "concise": "FI"},
			"250": {"original": "France", "concise": "FR"},
			"260": {"original": "French Southern Territories", "concise": "TF"},
			"266": {"original": "Gabon", "concise": "GA"},
			"270": {"original": "Gambia", "concise": "GM"},
			"268": {"original": "Georgia", "concise": "GE"},
			"276": {"original": "Germany", "concise": "DE"},
			"288": {"original": "Ghana", "concise": "GH"},
			"292": {"original": "Gibraltar", "concise": "GI"},
			"300": {"original": "Greece", "concise": "GR"},
			"304": {"original": "Greenland", "concise": "GL"},
			"308": {"original": "Grenada", "concise": "GD"},
			"320": {"original": "Guatemala", "concise": "GT"},
			"831": {"original": "Guernsey", "concise": "GG"},
			"324": {"original": "Guinea", "concise": "GN"},
			"624": {"original": "Guinea-Bissau", "concise": "GW"},
			"276": {"original": "Germany", "concise": "DE"},
			"328": {"original": "Guyana", "concise": "GY"},
			"332": {"original": "Haiti", "concise": "HT"},
			"334": {"original": "Heard Island and McDonald Islands", "concise": "HM"},
			"340": {"original": "Honduras", "concise": "HN"},
			"348": {"original": "Hungary", "concise": "HU"},
			"352": {"original": "Iceland", "concise": "IS"},
			"356": {"original": "India", "concise": "IN"},
			"360": {"original": "Indonesia", "concise": "ID"},
			"364": {"original": "Iran", "concise": "IR"},
			"368": {"original": "Iraq", "concise": "IQ"},
			"372": {"original": "Ireland", "concise": "IE"},
			"833": {"original": "Isle of Man", "concise": "IM"},
			"376": {"original": "Israel", "concise": "IL"},
			"380": {"original": "Italy", "concise": "IT"},
			"388": {"original": "Jamaica", "concise": "JM"},
			"392": {"original": "Japan", "concise": "JP"},
			"832": {"original": "Jersey", "concise": "JE"},
			"400": {"original": "Jordan", "concise": "JO"},
			"398": {"original": "Kazakhstan", "concise": "KZ"},
			"404": {"original": "Kenya", "concise": "KE"},
			"296": {"original": "Kiribati", "concise": "KI"},
			"414": {"original": "Kuwait", "concise": "KW"},
			"417": {"original": "Kyrgyzstan", "concise": "KG"},
			"418": {"original": "Laos", "concise": "LA"},
			"428": {"original": "Latvia", "concise": "LV"},
			"422": {"original": "Lebanon", "concise": "LB"},
			"426": {"original": "Lesotho", "concise": "LS"},
			"430": {"original": "Liberia", "concise": "LR"},
			"434": {"original": "Libya", "concise": "LY"},
			"438": {"original": "Liechtenstein", "concise": "LI"},
			"440": {"original": "Lithuania", "concise": "LT"},
			"442": {"original": "Luxembourg", "concise": "LU"},
			"450": {"original": "Madagascar", "concise": "MG"},
			"454": {"original": "Malawi", "concise": "MW"},
			"466": {"original": "Mali", "concise": "ML"},
			"458": {"original": "Malaysia", "concise": "MY"},
			"462": {"original": "Maldives", "concise": "MV"},
			"470": {"original": "Malta", "concise": "MT"},
			"584": {"original": "Marshall Islands", "concise": "MH"},
			"478": {"original": "Mauritania", "concise": "MR"},
			"480": {"original": "Mauritius", "concise": "MU"},
			"484": {"original": "Mexico", "concise": "MX"},
			"583": {"original": "Micronesia", "concise": "FM"},
			"498": {"original": "Moldova", "concise": "MD"},
			"492": {"original": "Monaco", "concise": "MC"},
			"496": {"original": "Mongolia", "concise": "MN"},
			"499": {"original": "Montenegro", "concise": "ME"},
			"500": {"original": "Montserrat", "concise": "MS"},
			"504": {"original": "Morocco", "concise": "MA"},
			"508": {"original": "Mozambique", "concise": "MZ"},
			"104": {"original": "Myanmar", "concise": "MM"},
			"516": {"original": "Namibia", "concise": "NA"},
			"520": {"original": "Nauru", "concise": "NR"},
			"524": {"original": "Nepal", "concise": "NP"},
			"530": {"original": "Netherlands Antilles", "concise": "AN"},
			"528": {"original": "Netherlands", "concise": "NL"},
			"554": {"original": "New Zealand", "concise": "NZ"},
			"558": {"original": "Nicaragua", "concise": "NI"},
			"566": {"original": "Nigeria", "concise": "NG"},
			"562": {"original": "Niger", "concise": "NE"},
			"570": {"original": "Niue", "concise": "NU"},
			"574": {"original": "Norfolk Island", "concise": "NF"},
			"408": {"original": "North Korea", "concise": "KP"},
			"578": {"original": "Norway", "concise": "NO"},
			"512": {"original": "Oman", "concise": "OM"},
			"586": {"original": "Pakistan", "concise": "PK"},
			"585": {"original": "Palau", "concise": "PW"},
			"275": {"original": "Palestinian Territory", "concise": "PS"},
			"591": {"original": "Panama", "concise": "PA"},
			"598": {"original": "Papua New Guinea", "concise": "PG"},
			"600": {"original": "Paraguay", "concise": "PY"},
			"604": {"original": "Peru", "concise": "PE"},
			"608": {"original": "Philippines", "concise": "PH"},
			"612": {"original": "Pitcairn", "concise": "PN"},
			"616": {"original": "Poland", "concise": "PL"},
			"620": {"original": "Portugal", "concise": "PT"},
			"634": {"original": "Qatar", "concise": "QA"},
			"642": {"original": "Romania", "concise": "RO"},
			"643": {"original": "Russian Federation", "concise": "RU"},
			"646": {"original": "Rwanda", "concise": "RW"},
			"638": {"original": "RÃ©union", "concise": "RE"},
			"654": {"original": "Saint Helena", "concise": "SH"},
			"659": {"original": "Saint Kitts and Nevis", "concise": "KN"},
			"662": {"original": "Saint Lucia", "concise": "LC"},
			"670": {"original": "Saint Vincent and the Grenadines", "concise": "VC"},
			"882": {"original": "Samoa", "concise": "WS"},
			"674": {"original": "San Marino", "concise": "SM"},
			"678": {"original": "Sao Tome and Principe", "concise": "ST"},
			"682": {"original": "Saudi Arabia", "concise": "SA"},
			"686": {"original": "Senegal", "concise": "SN"},
			"688": {"original": "Serbia", "concise": "RS"},
			"690": {"original": "Seychelles", "concise": "SC"},
			"694":{"original": "Sierra Leone", "concise": "SL"},
			"702": {"original": "Singapore", "concise": "SG"},
			"534": {"original": "Sint Maarten", "concise": "SX"},
			"703": {"original": "Slovakia", "concise": "SK"},
			"705": {"original": "Slovenia", "concise": "SI"},
			"90": {"original": "Solomon Islands", "concise": "SB"},
			"706": {"original": "Somalia", "concise": "SO"},
			"710": {"original": "South Africa", "concise": "ZA"},
			"239": {"original": "South Georgia", "concise": "GS"},
			"410": {"original": "South Korea", "concise": "KR"},
			"728": {"original": "South Sudan", "concise": "SS"},
			"724": {"original": "Spain", "concise": "ES"},
			"144": {"original": "Sri Lanka", "concise": "LK"},
			"729": {"original": "Sudan (the)", "concise": "SD"},
			"729": {"original": "Sudan (the)", "concise": "SD"},
			"740": {"original": "Suriname", "concise": "SR"},
			"748": {"original": "Swaziland", "concise": "SZ"},
			"752": {"original": "Sweden", "concise": "SE"},
			"756": {"original": "Switzerland", "concise": "CH"},
			"760": {"original": "Syria", "concise": "SY"},
			"762": {"original": "Tajikistan", "concise": "TJ"},
			"834": {"original": "Tanzania, United Republic of", "concise": "TZ"},
			"764": {"original": "Thailand", "concise": "TH"},
			"807": {"original": "The Former Yugoslav Republic of Macedonia", "concise": "MK"},
			"626": {"original": "Timor-Leste", "concise": "TL"},
			"768": {"original": "Togo", "concise": "TG"},
			"772": {"original": "Tokelau", "concise": "TK"},
			"776": {"original": "Tonga", "concise": "TO"},
			"780": {"original": "Trinidad and Tobago", "concise": "TT"},
			"788": {"original": "Tunisia", "concise": "TN"},
			"792": {"original": "Turkey", "concise": "TR"},
			"795": {"original": "Turkmenistan", "concise": "TM"},
			"796": {"original": "Turks and Caicos Islands", "concise": "TC"},
			"798": {"original": "Tuvalu", "concise": "TV"},
			"800": {"original": "Uganda", "concise": "UG"},
			"804": {"original": "Ukraine", "concise": "UA"},
			"784": {"original": "United Arab Emirates", "concise": "AE"},
			"826": {"original": "United Kingdom", "concise": "GB"},
			"581": {"original": "United States Minor Outlying Islands", "concise": "UM"},
			"840": {"original": "United States of America (the)", "concise": "US"},
			"858": {"original": "Uruguay", "concise": "UY"},
			"860": {"original": "Uzbekistan", "concise": "UZ"},
			"548": {"original": "Vanuatu", "concise": "VU"},
			"336": {"original": "Vatican City", "concise": "VA"},
			"862": {"original": "Venezuela", "concise": "VE"},
			"704": {"original": "Vietnam", "concise": "VN"},
			"887": {"original": "Yemen", "concise": "YE"},
			"180": {"original": "Zaire", "concise": "ZR"},
			"894": {"original": "Zambia", "concise": "ZM"},
			"716": {"original": "Zimbabwe", "concise": "ZW"}
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
		INCTOT:{
			"null": {
				"original": "null",
				"concise": "No data reported"
			},
			9999998: {
				"original": 9999998,
				"concise": "Unknown/missing"
			},
			"9999998": {
				"original": "9999998",
				"concise": "Unknown/missing"
			},
			9999999: {
				"original": 9999999,
				"concise": "NIU (not in universe)"
			},
			"9999999": {
				"original": "9999999",
				"concise": "NIU (not in universe)"
			}
		},
		RACE: {
			null: {
				"original": "No data reported",
				"concise": "No data"
			},
			"10": {
				"original": "White",
				"concise": "White"
			},
			"20": {
				"original": "Black",
				"concise": "Black"
			},
			"21": {
				"original": "Black African",
				"concise": "Black African"
			},
			"22": {
				"original": "Black Caribbean",
				"concise": "Black Caribbean"
			},
			"23": {
				"original": "Afro-Ecuadorian",
				"concise": "Afro-Ecuadorian"
			},
			"24": {
				"original": "Other Black",
				"concise": "Other Black"
			},
			"30": {
				"original": "Indigenous",
				"concise": "Indigenous"
			},
			"31": {
				"original": "American Indian",
				"concise": "American Indian"
			},
			"32": {
				"original": "Latin American Indian",
				"concise": "Lat American Indian"
			},
			"40": {
				"original": "Asian",
				"concise": "Asian"
			},
			"41": {
				"original": "Chinese",
				"concise": "Chinese"
			},
			"42": {
				"original": "Japanese",
				"concise": "Japanese"
			},
			"43": {
				"original": "Korean",
				"concise": "Korean"
			},
			"44": {
				"original": "Vietnamese",
				"concise": "Vietnamese"
			},
			"45": {
				"original": "Filipino",
				"concise": "Filipino"
			},
			"46": {
				"original": "Indian",
				"concise": "Indian"
			},
			"47": {
				"original": "Pakistani",
				"concise": "Pakistani"
			},
			"48": {
				"original": "Bangladeshi",
				"concise": "Bangladeshi"
			},
			"49": {
				"original": "Other Asian",
				"concise": "Other Asian"
			},
			"50": {
				"original": "Mixed race",
				"concise": "Mixed race"
			},
			"51": {
				"original": "Brown (Brazil)",
				"concise": "Brown"
			},
			"52": {
				"original": "Mestizo (Indigenous and White)",
				"concise": "Mestizo"
			},
			"53": {
				"original": "Mulatto (Black and White)",
				"concise": "Mulatto"
			},
			"54": {
				"original": "Coloured (South Africa)",
				"concise": "Coloured"
			},
			"55": {
				"original": "Two or more races",
				"concise": "Multiracial"
			},
			"60": {
				"original": "Other",
				"concise": "Other"
			},
			"61": {
				"original": "Montubio (Ecuador)",
				"concise": "Montubio"
			},
			"99": {
				"original": "Unknown",
				"concise": "Unknown"
			}
		},
		SCHOOL: {
			"null": {
				"original": "No data reported",
				"concise": "No data"
			},
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
