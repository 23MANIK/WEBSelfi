getDATA();
        async function getDATA(){
            const response = await fetch('/api');
            const data=await response.json();
            console.log(data);
       
        for(item of data){
            const root=document.createElement('p');
            const mood=document.createElement('div');
            const geo=document.createElement('div');
            const date=document.createElement('div');
           const image=document.createElement('img');

            geo.textContent=`Latitude : ${item.lat }  Longitude : ${  item.long}   mood: ${item.vegetable}`;
            const dateString=new Date(item.timespan).toLocaleString();
           date.textContent=dateString; 
           image.src=item.image64;
           image.alt="NIKsPIC";
           root.append(geo,date,image);
           document.body.append(root); 
        }
        };