$(document).ready(function() {
    // List of all currency options
    const currencyList = [
        { code: "USD", name: "US Dollar" },
        { code: "EUR", name: "Euro" },
        { code: "JPY", name: "Japanese Yen" },
        { code: "GBP", name: "British Pound" },
        { code: "AUD", name: "Australian Dollar" },
        { code: "CAD", name: "Canadian Dollar" },
        { code: "CHF", name: "Swiss Franc" },
        { code: "CNY", name: "Chinese Yuan" },
        { code: "NZD", name: "New Zealand Dollar" },
        { code: "SEK", name: "Swedish Krona" },
        { code: "NOK", name: "Norwegian Krone" },
        { code: "SGD", name: "Singapore Dollar" },
        { code: "HKD", name: "Hong Kong Dollar" },
        { code: "KRW", name: "South Korean Won" },
        { code: "INR", name: "Indian Rupee" },
        { code: "BRL", name: "Brazilian Real" },
        { code: "ZAR", name: "South African Rand" },
        { code: "MXN", name: "Mexican Peso" },
        { code: "TRY", name: "Turkish Lira" },
        { code: "RUB", name: "Russian Ruble" },
        { code: "AED", name: "UAE Dirham" },
        { code: "SAR", name: "Saudi Riyal" },
        { code: "EGP", name: "Egyptian Pound" }
    ];

   
    function populateSelectElement(selectElement, currencyList) {
        selectElement.empty(); 
        currencyList.forEach(currency => {
            selectElement.append(new Option(`${currency.code} - ${currency.name}`, currency.code));
        });
    }


    populateSelectElement($('#currencySelect'), currencyList);
    populateSelectElement($('#currencyHeader1'), currencyList);
    populateSelectElement($('#currencyHeader2'), currencyList);
    populateSelectElement($('#currencyHeader3'), currencyList);


    $('#currencySelect').val('EUR'); 
    $('#currencyHeader1').val('USD'); 
    $('#currencyHeader2').val('EGP'); 
    $('#currencyHeader3').val('SAR'); 


    async function fetchData() {
        const base = $('#currencySelect').val();
        const API_KEY = "fc3cb2097f8334efb90761703b66a936";

        const symbols = [
            $('#currencyHeader1').val(),
            $('#currencyHeader2').val(),
            $('#currencyHeader3').val()
        ].join(',');

        try {
            const res = await fetch(`https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}&base=${base}&symbols=${symbols}`);
            const data = await res.json();

            if (res.ok && data.success) {
                $('#timestamp').text(new Date(data.timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                $('#date').text(data.date);
                
                $('#rateHeader1').text(data.rates[$('#currencyHeader1').val()]);
                $('#rateHeader2').text(data.rates[$('#currencyHeader2').val()]);
                $('#rateHeader3').text(data.rates[$('#currencyHeader3').val()]);
            } else {

                alert(`Error: Code=${data.error.code}, Message=${data.error.info}`);
                console.error(`Failed to fetch the data: Code=${data.error.code}, Message=${data.error.info}`);
            }
        } catch (error) {
            console.error(`Unexpected error occurred: ${error.message}`);
        }
    }

    fetchData();

    $('#currencySelect, .currencyHeader').change(fetchData);

    setInterval(fetchData, 60000);
});
