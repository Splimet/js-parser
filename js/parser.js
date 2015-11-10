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
		changeTypeNewParameter($('#type-parameter'));
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
					'<td><button type="button" class="btn btn-xs btn-default" onclick="deleteParameter($(this).closest(\'tr\'))">Delete</button></td>' +
				'</tr>';
}
function createCell(field) {
	switch ( field.type ) {
		case TYPE_STRING:
			return '<input type="text" value=' + field.value + '>';
		case TYPE_INT:
			return '<input type="number" oninput="validationNumberInput($(this))" value=' + field.value + '>';
		case TYPE_BOOL:
			var checked = '';
			if ( field.value === 'True' )
				checked = 'checked';
			return '<input type="checkbox"' + checked + '>';
	}
}
function deleteParameter(row) {
	row.remove();
}
function addParameter() {
	var 
			name = $('#add-parameter-form #name-parameter').val(),
			description = $('#add-parameter-form #description-parameter').val(),
			value = $('#add-parameter-form #value-parameter').val(),
			type = $('#add-parameter-form #type-parameter').val();

	$('#parameters').append(createRow({ value: name, type: TYPE_STRING}, 
																	 { value: description, type: TYPE_STRING},																				
																	 { value: value, type: type}));
}


function changeTypeNewParameter(select) {
	var type = select.val();
	var inputValueNewParameter = select.next();

	switch (type) {
		case TYPE_STRING:
			inputValueNewParameter.attr('type', 'text');			
			inputValueNewParameter.attr('oninput', '');
			inputValueNewParameter.addClass("form-control");
			break;
		case TYPE_INT:
			inputValueNewParameter.attr('type', 'number');
			inputValueNewParameter.attr('oninput', 'validationNumberInput($(this))');
			inputValueNewParameter.addClass("form-control");
			break;
		case TYPE_BOOL:
			inputValueNewParameter.attr('type', 'checkbox');
			inputValueNewParameter.attr('oninput', '');
			inputValueNewParameter.removeClass("form-control");
			break;
		}
}


function translateValueParameter(input) {
	if (input.attr('type') === 'checkbox') {
		return input.prop("checked") ? 'True' : 'False';
	} else { 
		return input.val();
	}
}
function translateInXML() {
	var outputXML = '<?xml version=\"1.0\"?>\n<Parameters>\n';
	$('#parameters tr').each(function() {
			var tdList = $(this).find('td');
			if (tdList.length <= 4) return;			
			outputXML += '<Parameter>\n\r';
			outputXML += '<Name>' + $(tdList[0]).html() + '</Name>\n';
			outputXML += '<Description>' + $(tdList[1]).html() + '</Description>\n';
			outputXML += '<Type>' + $(tdList[2]).html() + '</Type>\n';
			outputXML += '<Value>' + translateValueParameter($(tdList[3]).find('input')) + '</Value>\n';
			console.log(translateValueParameter($(tdList[3]).find('input')));
			outputXML += '</Parameter>\n';
	});
	return outputXML + '</Parameters>';
}

function createFileWithCurentParameter() {
  var 
			xml = translateInXML(),
			link = $('#created-file'),
			file = new Blob([xml], {type: 'text/plain'});
  link.attr('href', URL.createObjectURL(file));
  link.attr('download', 'parameters.xml');
  link.css('display', 'inline');
}

function validationNumberInput(input) {
  if (!/(^([+-]?)([1-9]+?)[0-9]*$)|^0$/.test(input.val())) {
		input.val(input.attr('value'));
	} else input.attr('value', input.val());
}
