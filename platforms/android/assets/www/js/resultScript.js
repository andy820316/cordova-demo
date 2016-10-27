/**
 * 
 */

$(document).bind("deviceready", onDeviceReady);

function onDeviceReady() {
	did = device.uuid;
	getData();
}