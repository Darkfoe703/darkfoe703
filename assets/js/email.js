//91c0bb0f-2e61-48b3-94a1-8029a855ac96



function test() {
	nameVal = document.getElementsByName('name')[0].value;
	emailVal = document.getElementsByName('email')[0].value;
	messageVal = document.getElementsByName('message')[0].value;
	Email.send({
	    SecureToken : "91c0bb0f-2e61-48b3-94a1-8029a855ac96",
	    To : 'marcoromero_1@hotmail.com',
	    From : "nyto.amigo.10@gmail.com",
	    Subject : "Página de Contacto Web",
	    Body : `Envía: ${nameVal} <br> Email: ${emailVal} <br><br>
			Mensaje: <br>
			${messageVal}`
	}).then(
	  message => alert(message)
	);
}
