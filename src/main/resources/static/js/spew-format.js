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
			"4": {"original": "4", "name": "Afghanistan", "concise": "AF"},
			"8": {"original": "8", "name": "Albania", "concise": "AL"},
			"12": {"original": "12", "name": "Algeria", "concise": "DZ"},
			"20": {"original": "20", "name": "Andorra", "concise": "AD"},
			"24": {"original": "24", "name": "Angola", "concise": "AO"},
			"660": {"original": "660", "name": "Anguilla", "concise": "AI"},
			"10": {"original": "10", "name": "Antarctica", "concise": "AQ"},
			"28": {"original": "28", "name": "Antigua and Barbuda", "concise": "AG"},
			"32": {"original": "32", "name": "Argentina", "concise": "AR"},
			"51": {"original": "51", "name": "Armenia", "concise": "AM"},
			"533": {"original": "533", "name": "Aruba", "concise": "AW"},
			"36": {"original": "36", "name": "Australia", "concise": "AU"},
			"40": {"original": "40", "name": "Austria", "concise": "AT"},
			"31": {"original": "31", "name": "Azerbaijan", "concise": "AZ"},
			"44": {"original": "44", "name": "Bahamas", "concise": "BS"},
			"48": {"original": "48", "name": "Bahrain", "concise": "BH"},
			"50": {"original": "50", "name": "Bangladesh", "concise": "BD"},
			"52": {"original": "52", "name": "Barbados", "concise": "BB"},
			"112": {"original": "112", "name": "Belarus", "concise": "BY"},
			"56": {"original": "56", "name": "Belgium", "concise": "BE"},
			"84": {"original": "84", "name": "Belize", "concise": "BZ"},
			"204": {"original": "204", "name": "Benin", "concise": "BJ"},
			"60": {"original": "60", "name": "Bermuda", "concise": "BM"},
			"64": {"original": "64", "name": "Bhutan", "concise": "BT"},
			"68": {"original": "68", "name": "Bolivia", "concise": "BO"},
			"70": {"original": "70", "name": "Bosnia and Herzegovina", "concise": "BA"},
			"72": {"original": "72", "name": "Botswana", "concise": "BW"},
			"74": {"original": "74", "name": "Bouvet Island", "concise": "BV"},
			"76": {"original": "76", "name": "Brazil", "concise": "BR"},
			"86": {"original": "86", "name": "British Indian Ocean Territory", "concise": "IO"},
			"92": {"original": "92", "name": "British Virgin Islands", "concise": "VG"},
			"96": {"original": "96", "name": "Brunei Darussalam", "concise": "BN"},
			"100": {"original": "100", "name": "Bulgaria", "concise": "BG"},
			"854": {"original": "854", "name": "Burkina Faso", "concise": "BF"},
			"108": {"original": "108", "name": "Burundi", "concise": "BI"},
			"116": {"original": "116", "name": "Cambodia", "concise": "KH"},
			"120": {"original": "120", "name": "Cameroon", "concise": "CM"},
			"124": {"original": "124", "name": "Canada", "concise": "CA"},
			"132": {"original": "132", "name": "Cape Verde", "concise": "CV"},
			"136": {"original": "136", "name": "Cayman Islands", "concise": "KY"},
			"140": {"original": "140", "name": "Central African Republic", "concise": "CF"},
			"148": {"original": "148", "name": "Chad", "concise": "TD"},
			"152": {"original": "152", "name": "Chile", "concise": "CL"},
			"156": {"original": "156", "name": "China", "concise": "CN"},
			"162": {"original": "162", "name": "Christmas Island", "concise": "CX"},
			"166": {"original": "166", "name": "Cocos Islands", "concise": "CC"},
			"170": {"original": "170", "name": "Colombia", "concise": "CO"},
			"174": {"original": "174", "name": "Comoros (the)", "concise": "KM"},
			"180": {"original": "180", "name": "Congo (the Democratic Republic of the)", "concise": "CD"},
			"178": {"original": "178", "name": "Congo (the)", "concise": "CG"},
			"184": {"original": "184", "name": "Cook Islands", "concise": "CK"},
			"188": {"original": "188", "name": "Costa Rica", "concise": "CR"},
			"191": {"original": "191", "name": "Croatia", "concise": "HR"},
			"192": {"original": "192", "name": "Cuba", "concise": "CU"},
			"531": {"original": "531", "name": "Curacao", "concise": "CW"},
			"196": {"original": "196", "name": "Cyprus", "concise": "CY"},
			"203": {"original": "203", "name": "Czech Republic", "concise": "CZ"},
			"384": {"original": "384", "name": "CÃ´te d'Ivoire", "concise": "CI"},
			"208": {"original": "208", "name": "Denmark", "concise": "DK"},
			"262": {"original": "262", "name": "Djibouti", "concise": "DJ"},
			"214": {"original": "214", "name": "Dominican Republic", "concise": "DO"},
			"212": {"original": "212", "name": "Dominica", "concise": "DM"},
			"218": {"original": "218", "name": "Ecuador", "concise": "EC"},
			"818": {"original": "818", "name": "Egypt", "concise": "EG"},
			"222": {"original": "222", "name": "El Salvador", "concise": "SV"},
			"226": {"original": "226", "name": "Equatorial Guinea", "concise": "GQ"},
			"232": {"original": "232", "name": "Eritrea", "concise": "ER"},
			"233": {"original": "233", "name": "Estonia", "concise": "EE"},
			"231": {"original": "231", "name": "Ethiopia", "concise": "ET"},
			"238": {"original": "238", "name": "Falkland Islands", "concise": "FK"},
			"234": {"original": "234", "name": "Faroe Islands", "concise": "FO"},
			"242": {"original": "242", "name": "Fiji", "concise": "FJ"},
			"246": {"original": "246", "name": "Finland", "concise": "FI"},
			"250": {"original": "250", "name": "France", "concise": "FR"},
			"260": {"original": "260", "name": "French Southern Territories", "concise": "TF"},
			"266": {"original": "266", "name": "Gabon", "concise": "GA"},
			"270": {"original": "270", "name": "Gambia", "concise": "GM"},
			"268": {"original": "268", "name": "Georgia", "concise": "GE"},
			"276": {"original": "276", "name": "Germany", "concise": "DE"},
			"288": {"original": "288", "name": "Ghana", "concise": "GH"},
			"292": {"original": "292", "name": "Gibraltar", "concise": "GI"},
			"300": {"original": "300", "name": "Greece", "concise": "GR"},
			"304": {"original": "304", "name": "Greenland", "concise": "GL"},
			"308": {"original": "308", "name": "Grenada", "concise": "GD"},
			"320": {"original": "320", "name": "Guatemala", "concise": "GT"},
			"831": {"original": "831", "name": "Guernsey", "concise": "GG"},
			"624": {"original": "624", "name": "Guinea-Bissau", "concise": "GW"},
			"276": {"original": "276", "name": "Germany", "concise": "DE"},
			"328": {"original": "328", "name": "Guyana", "concise": "GY"},
			"332": {"original": "332", "name": "Haiti", "concise": "HT"},
			"334": {"original": "334", "name": "Heard Island and McDonald Islands", "concise": "HM"},
			"340": {"original": "340", "name": "Honduras", "concise": "HN"},
			"348": {"original": "348", "name": "Hungary", "concise": "HU"},
			"352": {"original": "352", "name": "Iceland", "concise": "IS"},
			"356": {"original": "356", "name": "India", "concise": "IN"},
			"360": {"original": "360", "name": "Indonesia", "concise": "ID"},
			"364": {"original": "364", "name": "Iran", "concise": "IR"},
			"368": {"original": "368", "name": "Iraq", "concise": "IQ"},
			"372": {"original": "372", "name": "Ireland", "concise": "IE"},
			"833": {"original": "833", "name": "Isle of Man", "concise": "IM"},
			"376": {"original": "376", "name": "Israel", "concise": "IL"},
			"380": {"original": "380", "name": "Italy", "concise": "IT"},
			"388": {"original": "388", "name": "Jamaica", "concise": "JM"},
			"392": {"original": "392", "name": "Japan", "concise": "JP"},
			"832": {"original": "832", "name": "Jersey", "concise": "JE"},
			"400": {"original": "400", "name": "Jordan", "concise": "JO"},
			"398": {"original": "398", "name": "Kazakhstan", "concise": "KZ"},
			"404": {"original": "404", "name": "Kenya", "concise": "KE"},
			"296": {"original": "296", "name": "Kiribati", "concise": "KI"},
			"414": {"original": "414", "name": "Kuwait", "concise": "KW"},
			"417": {"original": "417", "name": "Kyrgyzstan", "concise": "KG"},
			"418": {"original": "418", "name": "Laos", "concise": "LA"},
			"428": {"original": "428", "name": "Latvia", "concise": "LV"},
			"422": {"original": "422", "name": "Lebanon", "concise": "LB"},
			"426": {"original": "426", "name": "Lesotho", "concise": "LS"},
			"430": {"original": "430", "name": "Liberia", "concise": "LR"},
			"434": {"original": "434", "name": "Libya", "concise": "LY"},
			"438": {"original": "438", "name": "Liechtenstein", "concise": "LI"},
			"440": {"original": "440", "name": "Lithuania", "concise": "LT"},
			"442": {"original": "442", "name": "Luxembourg", "concise": "LU"},
			"450": {"original": "450", "name": "Madagascar", "concise": "MG"},
			"454": {"original": "454", "name": "Malawi", "concise": "MW"},
			"458": {"original": "458", "name": "Malaysia", "concise": "MY"},
			"462": {"original": "462", "name": "Maldives", "concise": "MV"},
			"470": {"original": "470", "name": "Malta", "concise": "MT"},
			"584": {"original": "584", "name": "Marshall Islands", "concise": "MH"},
			"478": {"original": "478", "name": "Mauritania", "concise": "MR"},
			"480": {"original": "480", "name": "Mauritius", "concise": "MU"},
			"484": {"original": "484", "name": "Mexico", "concise": "MX"},
			"583": {"original": "583", "name": "Micronesia", "concise": "FM"},
			"498": {"original": "498", "name": "Moldova", "concise": "MD"},
			"492": {"original": "492", "name": "Monaco", "concise": "MC"},
			"496": {"original": "496", "name": "Mongolia", "concise": "MN"},
			"499": {"original": "499", "name": "Montenegro", "concise": "ME"},
			"500": {"original": "500", "name": "Montserrat", "concise": "MS"},
			"504": {"original": "504", "name": "Morocco", "concise": "MA"},
			"508": {"original": "508", "name": "Mozambique", "concise": "MZ"},
			"104": {"original": "104", "name": "Myanmar", "concise": "MM"},
			"516": {"original": "516", "name": "Namibia", "concise": "NA"},
			"520": {"original": "520", "name": "Nauru", "concise": "NR"},
			"524": {"original": "524", "name": "Nepal", "concise": "NP"},
			"530": {"original": "530", "name": "Netherlands Antilles", "concise": "AN"},
			"528": {"original": "528", "name": "Netherlands", "concise": "NL"},
			"554": {"original": "554", "name": "New Zealand", "concise": "NZ"},
			"558": {"original": "558", "name": "Nicaragua", "concise": "NI"},
			"566": {"original": "566", "name": "Nigeria", "concise": "NG"},
			"562": {"original": "562", "name": "Niger", "concise": "NE"},
			"570": {"original": "570", "name": "Niue", "concise": "NU"},
			"574": {"original": "574", "name": "Norfolk Island", "concise": "NF"},
			"408": {"original": "408", "name": "North Korea", "concise": "KP"},
			"578": {"original": "578", "name": "Norway", "concise": "NO"},
			"512": {"original": "512", "name": "Oman", "concise": "OM"},
			"586": {"original": "586", "name": "Pakistan", "concise": "PK"},
			"585": {"original": "585", "name": "Palau", "concise": "PW"},
			"275": {"original": "275", "name": "Palestinian Territory", "concise": "PS"},
			"591": {"original": "591", "name": "Panama", "concise": "PA"},
			"598": {"original": "598", "name": "Papua New Guinea", "concise": "PG"},
			"600": {"original": "600", "name": "Paraguay", "concise": "PY"},
			"604": {"original": "604", "name": "Peru", "concise": "PE"},
			"608": {"original": "608", "name": "Philippines", "concise": "PH"},
			"612": {"original": "612", "name": "Pitcairn", "concise": "PN"},
			"616": {"original": "616", "name": "Poland", "concise": "PL"},
			"620": {"original": "620", "name": "Portugal", "concise": "PT"},
			"634": {"original": "634", "name": "Qatar", "concise": "QA"},
			"642": {"original": "642", "name": "Romania", "concise": "RO"},
			"643": {"original": "643", "name": "Russian Federation", "concise": "RU"},
			"646": {"original": "646", "name": "Rwanda", "concise": "RW"},
			"638": {"original": "638", "name": "RÃ©union", "concise": "RE"},
			"654": {"original": "654", "name": "Saint Helena", "concise": "SH"},
			"659": {"original": "659", "name": "Saint Kitts and Nevis", "concise": "KN"},
			"662": {"original": "662", "name": "Saint Lucia", "concise": "LC"},
			"670": {"original": "670", "name": "Saint Vincent and the Grenadines", "concise": "VC"},
			"882": {"original": "882", "name": "Samoa", "concise": "WS"},
			"674": {"original": "674", "name": "San Marino", "concise": "SM"},
			"678": {"original": "678", "name": "Sao Tome and Principe", "concise": "ST"},
			"682": {"original": "682", "name": "Saudi Arabia", "concise": "SA"},
			"686": {"original": "686", "name": "Senegal", "concise": "SN"},
			"688": {"original": "688", "name": "Serbia", "concise": "RS"},
			"690": {"original": "690", "name": "Seychelles", "concise": "SC"},
			"702": {"original": "702", "name": "Singapore", "concise": "SG"},
			"534": {"original": "534", "name": "Sint Maarten", "concise": "SX"},
			"703": {"original": "703", "name": "Slovakia", "concise": "SK"},
			"705": {"original": "705", "name": "Slovenia", "concise": "SI"},
			"90": {"original": "90", "name": "Solomon Islands", "concise": "SB"},
			"706": {"original": "706", "name": "Somalia", "concise": "SO"},
			"710": {"original": "710", "name": "South Africa", "concise": "ZA"},
			"239": {"original": "239", "name": "South Georgia", "concise": "GS"},
			"410": {"original": "410", "name": "South Korea", "concise": "KR"},
			"728": {"original": "728", "name": "South Sudan", "concise": "SS"},
			"724": {"original": "724", "name": "Spain", "concise": "ES"},
			"144": {"original": "144", "name": "Sri Lanka", "concise": "LK"},
			"729": {"original": "729", "name": "Sudan (the)", "concise": "SD"},
			"729": {"original": "729", "name": "Sudan (the)", "concise": "SD"},
			"740": {"original": "740", "name": "Suriname", "concise": "SR"},
			"748": {"original": "748", "name": "Swaziland", "concise": "SZ"},
			"752": {"original": "752", "name": "Sweden", "concise": "SE"},
			"756": {"original": "756", "name": "Switzerland", "concise": "CH"},
			"760": {"original": "760", "name": "Syria", "concise": "SY"},
			"762": {"original": "762", "name": "Tajikistan", "concise": "TJ"},
			"834": {"original": "834", "name": "Tanzania, United Republic of", "concise": "TZ"},
			"764": {"original": "764", "name": "Thailand", "concise": "TH"},
			"807": {"original": "807", "name": "The Former Yugoslav Republic of Macedonia", "concise": "MK"},
			"626": {"original": "626", "name": "Timor-Leste", "concise": "TL"},
			"768": {"original": "768", "name": "Togo", "concise": "TG"},
			"772": {"original": "772", "name": "Tokelau", "concise": "TK"},
			"776": {"original": "776", "name": "Tonga", "concise": "TO"},
			"780": {"original": "780", "name": "Trinidad and Tobago", "concise": "TT"},
			"788": {"original": "788", "name": "Tunisia", "concise": "TN"},
			"792": {"original": "792", "name": "Turkey", "concise": "TR"},
			"795": {"original": "795", "name": "Turkmenistan", "concise": "TM"},
			"796": {"original": "796", "name": "Turks and Caicos Islands", "concise": "TC"},
			"798": {"original": "798", "name": "Tuvalu", "concise": "TV"},
			"804": {"original": "804", "name": "Ukraine", "concise": "UA"},
			"784": {"original": "784", "name": "United Arab Emirates", "concise": "AE"},
			"826": {"original": "826", "name": "United Kingdom", "concise": "GB"},
			"581": {"original": "581", "name": "United States Minor Outlying Islands", "concise": "UM"},
			"840": {"original": "840", "name": "United States of America (the)", "concise": "US"},
			"858": {"original": "858", "name": "Uruguay", "concise": "UY"},
			"860": {"original": "860", "name": "Uzbekistan", "concise": "UZ"},
			"548": {"original": "548", "name": "Vanuatu", "concise": "VU"},
			"336": {"original": "336", "name": "Vatican City", "concise": "VA"},
			"862": {"original": "862", "name": "Venezuela", "concise": "VE"},
			"704": {"original": "704", "name": "Vietnam", "concise": "VN"},
			"887": {"original": "887", "name": "Yemen", "concise": "YE"},
			"180": {"original": "180", "name": "Zaire", "concise": "ZR"},
			"894": {"original": "894", "name": "Zambia", "concise": "ZM"},
			"716": {"original": "716", "name": "Zimbabwe", "concise": "ZW"}
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
