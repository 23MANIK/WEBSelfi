

//if geolocation is availbale in navigator it will run else will console log not available
function setup() {

    noCanvas();
    const vedio = createCapture(VIDEO);
    vedio.size(320, 240);

    let long, lat
    if ("geolocation" in navigator) {
        console.log("geolocation available");
        navigator.geolocation.getCurrentPosition(async position => {
            //console.log(position.coords);
            lat = position.coords.latitude;
            long = position.coords.longitude;
            document.getElementById('latitude').textContent = lat.toFixed(3);
            document.getElementById('longitude').textContent = long.toFixed(3);


        });


    } else {
        console.log('geolocation is not available');
    }

    const button = document.getElementById('submit');
    button.addEventListener('click', async event => {
        const vegetable = document.getElementById('vegetable').value;
        lat = document.getElementById('latitude').textContent;
        long = document.getElementById('longitude').textContent;
        vedio.loadPixels();
        const image64 = vedio.canvas.toDataURL();
        const data = { lat, long, vegetable, image64 };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/api', options);
        const json = await response.json();
        console.log(json);
    });


};

