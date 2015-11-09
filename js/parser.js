var 
		TYPE_STRING = 'System.String',
		TYPE_INT = 'System.Int32',
		TYPE_BOOL = 'System.Boolean';
		
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
				$("#parameters").append(createRow({ value: $(this).find("Name").text(), type: TYPE_STRING}, 
																					{ value: $(this).find("Description").text(), type: TYPE_STRING},																				
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
		case TYPE_STRING:
			return '<input type="text" onchange="" value=' + field.value + '>';
		case TYPE_INT:
			return '<input type="number" oninput="" value=' + field.value + '>';
		case TYPE_BOOL:
			var checked = '';
			if ( field.value === 'True' )
				checked = 'checked';
			return '<input type="checkbox" onchange="" ' + checked + '>';
	}
}