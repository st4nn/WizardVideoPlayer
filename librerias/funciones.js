$(document).on("ready", arranque);

function arranque()
{
	$("#btnGenerar").on("click", btn_Generar);		
	$("#btnPrevisualizar").on("click", btn_Previsualizar);
	$("#txtVolumen").on("blur", txtVolumen_Change);
	$("#cboSkin").on("change", cboSkin_Change);

	 if ($.browser.msie && $.browser.version > 6)	{
		//alert("Usando Internet Explorer? no, que boleta...");
				}

}
function btn_Previsualizar(evento)
{
	evento.preventDefault();

	var AutoStartvar = $("#chkAutostart").is(':checked');
	if ($("#txtStream").val() != "")
	{
		if ($("#txtServidor").val() != "")
		{
			$.post("librerias/GenerarEmbed.php",  
			{
				Stream : $("#txtStream").val(),
				Titulo : $("#txtTitulo").val(),
				Color_Atras : $("#txtColorPanel").val(),
				Color_Frente : $("#txtColorBotones").val(),
				Color_Luz : $("#txtColorSombras").val(),
				Color_Pantalla : $("#txtColorPantalla").val(),
				Skin : $("#cboSkin").val(),
				Volumen: $("#txtVolumen").val(),
				Servidor: $("#txtServidor").val(),
				Autostart : AutoStartvar,
				Panel : $("#cboUbicacionPanel").val(),
				Ancho : $("#txtAncho").val(),
				Alto : $("#txtAlto").val()
			}, 
			function(data)
			{	
				data = "<p align=\"center\"> \n" + data + " \n </p>";
				Shadowbox.open	({
					player: 'html',
					content: data,
					height: $("#txtAlto").val() * 1.1,
					width: $("#txtAncho").val() * 1.1
						});
			});
		} else
		{
			alert("El campo Servidor no puede estar vacío");
		}
		
	} else
	{
		alert("El campo Stream no puede estar vacío");
	}
	
}
				
function btn_Generar(evento)
{
	evento.preventDefault();
	if ($("#txtStream").val() != "")
	{
		if ($("#txtServidor").val() != "")
		{
			var AutoStartvar = $("#chkAutostart").is(':checked');

			var codigo;
			var url;
			var Tipo;
			if ($("#cboTipoCodigo").val() == "JavaScript")
			{
				url = "librerias/GenerarJS.php";
				Tipo= "GenerarVideoJS";				
			}else
			{
				url = "librerias/GenerarEmbed.php"	;
				Tipo= 'GenerarVideoEmbed';
			}
			
			codigo = "<iframe src='http://bronco.cehis.net/generarplayer/" + Tipo + ".php?" +
				"var1=" + $("#txtStream").val() + 
				"&var2=" + $("#txtTitulo").val() + 
				"&var3=" + $("#txtColorPanel").val() + 
				"&var4=" + $("#txtColorBotones").val() + 
				"&var5=" + $("#txtColorSombras").val() + 
				"&var6=" + $("#txtColorPantalla").val() + 
				"&var7=" + $("#cboSkin").val() + 
				"&var8=" + $("#txtVolumen").val() + 
				"&var9=" + $("#txtServidor").val() + 
				"&var10=" + AutoStartvar + 
				"&var11=" + $("#cboUbicacionPanel").val() + 
				"&var12=" + $("#txtAncho").val() + 
				"&var13=" + $("#txtAlto").val() + "' name='CeHis Video PLayer'";
			codigo += "width='" + $("#txtAncho").val() + "' height='" + $("#txtAlto").val() + "' scrolling='no' frameborder='0'>";
			codigo += "<p>El Servicio no fue encontrado</p>";
			codigo += "</iframe>";
			
			$("#txtCodigo").val(codigo);
			
		} else
		{
			alert("El campo Servidor no puede estar vacío");
			$("#txtServidor").focus();
		}
		
	} else
	{
		alert("El campo Stream no puede estar vacío");
		$("#txtStream").focus();
	}
}

function cboSkin_Change()
{
	if ($("#cboSkin").val() == 'default')
	{
		$("#fdsNivel1").slideDown();
	}
	else
	{
		$("#fdsNivel1").slideUp();
	}
}
function txtVolumen_Change()
{
	obj = parseInt($("#txtVolumen").val()); 
	if (isNaN(obj)) 
	{ 
		alert ( "El campo Volumen debe ser numerico");
	}
	else
	{
				if (obj > 100) 		{
			alert ( "El Volumen no puede ser superior a 100");	
			$("#txtVolumen").val('100');
									}
				if (obj < 0) 		{
			alert ( "El Volumen no puede ser inferior a 0");	
			$("#txtVolumen").val('0');
									}
			}
}
