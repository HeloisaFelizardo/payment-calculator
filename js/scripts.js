//Programa para calcular multa e juros de contas em atraso
// Programa para calcular multa, juros e correção monetária de contas em atraso
const frm = document.querySelector('form');
const resp = document.querySelector('h3');

const TAXA_MULTA = 0.1; // 10%
const TAXA_JUROS_MENSAL = 0.01; // 1%
const TAXA_CORRECAO = 0.01; // 1%

frm.addEventListener('submit', (e) => {
	e.preventDefault();
	const dataVenc = frm.inDataVenc.value;
	const valor = Number(frm.inValor.value);
	const hoje = new Date();
	const vencto = new Date();

	const partes = dataVenc.split('-');
	vencto.setDate(Number(partes[2]));
	vencto.setMonth(Number(partes[1]) - 1);
	vencto.setFullYear(Number(partes[0]));

	const atraso = hoje - vencto;
	let multa = 0;
	let juros = 0;
	let correcao = 0;

	if (atraso > 0) {
		// converte milissegundos do atraso em dias (1 dia = 24h x 60min x 60 seg x 1000ms: 86400000)
		const dias = atraso / 86400000;
		multa = valor * TAXA_MULTA;
		juros = valor * TAXA_JUROS_MENSAL * dias;
		correcao = valor * TAXA_CORRECAO * dias;
	}

	const total = valor + multa + juros + correcao;

	frm.outMulta.value = multa.toFixed(2);
	frm.outJuros.value = juros.toFixed(2);
	frm.outCorrecao.value = correcao.toFixed(2);
	frm.outTotal.value = total.toFixed(2);
});
