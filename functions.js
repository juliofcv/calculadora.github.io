 const TAX = {
  IVA: 0.12,
  ISR: 0.05,
  IPSP: 0.005,
  ISREXCEDENTE: 0.07,
  ISR_IMPORTEFIJO: 1500,
  ISREXCEDENTEMAXIMO: 30000
}

function scope() {
  let TOTALNOIPSP= Number.parseFloat(document.getElementById("cantneta").value);
  let BASE = ((TOTALNOIPSP/(1+TAX.IVA))).toFixed(2);
  let IPSPP = (BASE*TAX.IPSP).toFixed(2);
  let TOTALFACTURADO = (Number(TOTALNOIPSP) + Number(IPSPP)).toFixed(2);
  let ISRP;
  if (TOTALNOIPSP > TAX.ISREXCEDENTEMAXIMO) {  
    let ISRPBASE1 = (BASE*TAX.ISR).toFixed(2);
    let RESTOEXCEDENTE = TOTALFACTURADO - TAX.ISREXCEDENTEMAXIMO;
    let BASE2 = ((RESTOEXCEDENTE/(1+TAX.IVA))).toFixed(2);
    let ISRPBASE2 = (BASE2*TAX.ISREXCEDENTE).toFixed(2);
    ISRP = (Number(TAX.ISR_IMPORTEFIJO) + Number(ISRPBASE1) + Number(ISRPBASE2)).toFixed(2);
  } else {
    ISRP = (BASE*TAX.ISR).toFixed(2);
  }
  let IVAP = (BASE*TAX.IVA).toFixed(2);
  let RESTO = (TOTALFACTURADO - IVAP - ISRP - IPSPP).toFixed(2);
  document.getElementById('base').innerHTML = `Q. ${separator(BASE)}`;
  document.getElementById('totalfactura').innerHTML = `Q. ${separator(TOTALFACTURADO)}`;
  document.getElementById('facturar').innerHTML = `Q. ${separator(RESTO)}`;
  document.getElementById('timbre').innerHTML = `Q. ${separator(IPSPP)}`;
  document.getElementById('ivapagar').innerHTML = `Q. ${separator(IVAP)}`;
  document.getElementById('isrpagar').innerHTML = `Q. ${separator(ISRP)}`;
}

function separator(numb) {
  return numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isNumber(event) {
  event = event || window.event;
  const charCode = event.charCode || event.which;
  return !(charCode > 31 && (charCode < 48 || charCode > 57));
}
