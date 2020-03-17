
var numberField = ["rating_territory", "policy_holder_cell_phone", "phone_number_1", "phone_number_2", "agency_id", "agency_tax_id", "coverage_d_limit", "coverage_c_limit", "coverage_a_limit", "coverage_a_deductible"]
var dateField = ["policy_expiration_date", , "lapse_begin_date", "property_inspection_date",
]

var dropdownField = ["state_or_province","occupancy_type", "stateField", "companion_policy_status", "renewal_status",
	"companion_policy_type", "foundation_type", "construction_type", "roof_type",
	"unrepaired_eq_damage", "billing_plan","mailing_same_as_risk_address"]
function getDropDownValue(data)
{

	switch (data) {
		case "occupancy_type":
			return ["Owner", "Tenant"];
		case "state_or_province":
			return ["AL", "AK", "AZ", "AR", "CA",
				"CO", "CT", "DE", "FL", "GA", "HI", "ID",
				"IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
				"NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX",
				"UT", "VT", "VA", "WA", "WV", "WI", "WY",];
		case "companion_policy_status":
			return ["Active", "Cancel", "Ineligible", "Eligible"];
		case "renewal_status":
			return ["Renew", "Non-Renew"];
		case "companion_policy_type":
			return ["Homeowners", "ManufacturedMobile", "DwellingFire", "Condominium", "RentersTenant"] 

		case "foundation_type":
			return ["Slab", "Raised", "Other"];

		case "construction_type":
			return ["Frame", "Other"];

		case "roof_type":
			return ["Composition", "WoodShake", "Tile", "Other"];
		case "unrepaired_eq_damage":
			return ["Yes", "No"];
		case "billing_plan":
			return ["Insured", "Mortgagee", "SecondMortgagee", "3rdPartyDesignee"];
		case "mailing_same_as_risk_address":
			return ["true", "false"];

	}
	
		
}

function createDocSpec(collapse,model) {
	
	var data = JSON.parse(model);
	var spec = {};
	spec['elements'] = {};
	for (var i = 0; i < data.length; i++) {
		if (numberField.includes(data[i].Name)) {
			spec.elements[data[i].Name] = {
				'hasText': function (jsElement) {
					if (jsElement.hasElements()) {
						return false;
					}
					else {
						return true;
					}
				},
				collapsed: function () {
					if (collapse) {
						return true;
					}
					else {
						return false;
					}
				},
				asker: Xonomy.askNumString
			}
		}
		else if (dateField.includes(data[i].Name)) {
			spec.elements[data[i].Name] = {
				'hasText': function (jsElement) {
					if (jsElement.hasElements()) {
						return false;
					}
					else {
						return true;
					}
				},
				collapsed: function () {
					if (collapse) {
						return true;
					}
					else {
						return false;
					}
				},
				asker: Xonomy.askDateString
			}
		}
		else if (dropdownField.includes(data[i].Name)) {
			spec.elements[data[i].Name] = {
				'hasText': function (jsElement) {
					if (jsElement.hasElements()) {
						return false;
					}
					else {
						return true;
					}
				},
				collapsed: function () {
					if (collapse) {
						return true;
					}
					else {
						return false;
					}
				},
				asker: Xonomy.askPicklist,
				askerParameter: getDropDownValue(data[i].Name)
			}
		}
		else {
			spec.elements[data[i].Name] = {
				'hasText': function (jsElement) {
					if (jsElement.hasElements()) {
						return false;
					}
					else {
						return true;
					}
				},
				collapsed: function () {
					if (collapse) {
						return true;
					}
					else {
						return false;
					}
				},
				asker: Xonomy.askString
			}
		}
	}

	spec['validate'] = {}
	spec.validate = function (jsElement) {
		if (jsElement.name == "") {
			Xonomy.warnings.push({
				htmlID: jsAttribute.htmlID,
				text: "en: The attribute must not be empty."

			});
		}
	}

	return spec;
}

function CreateUnEditableDocSpec(collapse, data) {
	var spec = {};
	spec['elements'] = {};
	for (var i = 0; i < data.length; i++) {
		spec.elements[data[i].Name] = {
			'hasText': function (jsElement) {
				if (jsElement.hasElements()) {
					return false;
				}
				else {
					return true;
				}
			},

			collapsed: function (jsElement) {
				if (collapse) {
					return true;
				}
				else {
					return false;
				}
			}
		}
	}
	return spec;
}
