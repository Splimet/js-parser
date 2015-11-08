$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "data/data.xml",
        dataType: "xml",
        success: xmlParser
    });
});

function xmlParser(xml) {
    $(xml).find("Parameter").each(function () {				
				$("#parameters").append(createRow({ value: $(this).find("Name").text(), type: 'System.String'}, 
																					{ value: $(this).find("Description").text(), type: 'System.String'},																				
																					{ value: $(this).find("Value").text(), type: $(this).find("Type").text()}));
    });

}
function createRow(name, description, parameter) {
	return '<tr>' +
					'<td>' + name.value + '</td>' +
					'<td>' + description.value + '</td>' +
					'<td>' + parameter.type + '</td>' +
					'<td>' + createCell(parameter) + '</td>' +	
					'<td><button type="button" class="btn btn-xs btn-default">Delete</button></td>' +
				'</tr>';
}

function createCell( field ){
	switch ( field.type ) {
		case 'System.String':
			return '<input type="text" onchange="changeValueInField(this)" value=' + field.value + '>';
		case 'System.Int32':
			return '<input type="number" oninput="checkFieldForNumber(this); changeValueInField(this)" value=' + field.value + '>';
		case 'System.Boolean':
			if ( value === 'True' )
				return '<input type="checkbox" onchange="changeValueInField(this)" checked="checked">';
			else
				return '<input type="checkbox" onchange="changeValueInField(this)" >';
	}
}