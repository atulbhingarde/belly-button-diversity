function getPlots(id) {
//Read samples.json
    // d3.json("sample.json").then(function (sampledata) {
    // Object.entries(data).forEach(([key, value]) => {
    //   panelMetadata.append("h5").text(`${key}: ${value}`);
    // });
    
    // // BONUS: Build the Gauge Chart
    // // buildGauge(data.WFREQ);
    d3.json("samples.json").then (sampledata =>{
    var freqcount = [];
    var freqcounttot = [] ;
    var i;
    hh = sampledata.metadata ; 

    for (i=0;i < Object.keys(hh).length ; i++){
     // console.log("here "+ sampledata.metadata[i]["wfreq"]);
     // console.log("here "+ sampledata.metadata[i]["ethnicity"]);
     freqcount[sampledata.metadata[i]["ethnicity"]] =+ sampledata.metadata[i]["wfreq"];
     freqcounttot[sampledata.metadata[i]["ethnicity"]] =+ 1 ;

     // freqcount[hh["etinicity"]] = hh.metadata[i][wfrew];
    }
    var ind;
    for (ind in freqcount) { console.log(ind + " " + freqcount[ind] + " " +freqcounttot[ind]);}
    // console.log("here " + sampledata.metadata[0]["wfreq"]);

    console.log("here " + sampledata.wfreq );

    var data = [{domain: {x: [0, 1], y: [0, 1]}, value: sampledata.wfreq,
    title: {text: "Belly Button Washing Frequency Scrubs Per Week", font: {size: 14}},
    type: "indicator", mode: "gauge+number+delta",
    delta: {reference: 9, increasing: {color: "green"}},
    gauge:
      {axis: {range: [0, 10]}, steps: [{range: [0, 2], color: "skyblue"},
                                       {range: [2, 4], color: "yellow" }, 
                                       {range: [4, 6], color: "magenta"},
                                       {range: [6, 8], color: "gray"},
                                       {range: [8, 10], color: "wheat"}], threshold: {line: {color: "red", width: 4},
      thickness: 0.75, value: freqcount["Caucasian/Asian"]}}}];

    var gaugeLayout = {width: 400, height: 500, margin: {t: 0, b: 0}};
    Plotly.newPlot("gauge", data, gaugeLayout);
    // hh = sampledata.metadata ; 
    console.log(Object.keys(hh).length);
    // var freqcount = [];
    // var freqcounttot = [] ;
    // var i;
    // for (i=0;i < Object.keys(hh).length ; i++){
    //  // console.log("here "+ sampledata.metadata[i]["wfreq"]);
    //  // console.log("here "+ sampledata.metadata[i]["ethnicity"]);
    //  freqcount[sampledata.metadata[i]["ethnicity"]] =+ sampledata.metadata[i]["wfreq"];
    //  freqcounttot[sampledata.metadata[i]["ethnicity"]] =+ 1 ;

    //  // freqcount[hh["etinicity"]] = hh.metadata[i][wfrew];
    // }
    // var ind;
    // for (ind in freqcount) { console.log(ind + " " + freqcount[ind] + " " +freqcounttot[ind]);}
    // // console.log("here " + sampledata.metadata[0]["wfreq"]);

    });
    d3.json("samples.json").then (sampledata =>{
        console.log(sampledata)
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)
        var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log (labels)
    // get only top 10 otu ids for the plot OTU and reversing it. 
        var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
    // get the otu id's to the desired form for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`)
     // get the top 10 labels for the plot
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`);
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
        // create data variable
        var data = [trace];

        // create layout variable to set plots layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear", linewidth:1 , mirror: true
            },
            xaxis:{ linewidth:1 , mirror: true
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            },
            width: 500,
            textposition: "outside",
            texttemplate: "%{text:.2s}",
        };

        // create the bar plot
        Plotly.newPlot("bar", data, layout);
    
        // The bubble chart
        var trace1 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            // y: sampledata.samples[0].wfreq,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                // size: sampledata.samples[0].wfreq,
                color: sampledata.samples[0].otu_ids
            },
            text:  sampledata.samples[0].otu_labels

        };
        // var obj = JSON.parse("samples.json");
        // set the layout for the bubble plot
        var layout_2 = {
            xaxis:{title: "OTU ID",linewidth:1 , mirror: true},
            yaxis:{linewidth: 1 , mirror: true },
            height: 600,
            width: 1000,
            autorange: true,
        };

        // creating data variable 
        var data1 = [trace1];

    // create the bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 
        // Plotly.newPlot.add("gauge", data, gaugeLayout);

    });
}  
// create the function to get the necessary data
function getDemoInfo(id) {
// read the json file to get data
    d3.json("samples.json").then((data)=> {
// get the metadata info for the demographic panel
        var metadata = data.metadata;

        console.log(metadata);

      // filter meta data info by id
       var result = metadata.filter(meta => meta.id.toString() === id)[0];
      // select demographic panel to put data
       var demographicInfo = d3.select("#sample-metadata");
        
     // empty the demographic info panel each time before getting new id info
       demographicInfo.html("");

     // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}
// create the function for the change event
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data)=> {
        console.log(data);

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
    });
}

init();