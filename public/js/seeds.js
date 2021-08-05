$('#county').on('change', function(e) {
    var county = document.getElementById("county").value;
    var zone_element = document.getElementById('zone');
    zone_element.replaceChildren();
    zone_element.disabled = false;
    var county_zones = {
        1: ['coastal'],
        2: ['coastal', 'dryland', 'mid_altitude'],
        3: ['coastal', 'dryland'],
        4: ['coastal', 'dryland', 'mid_altitude'],
        5: ['coastal', 'dryland'],
        6: ['coastal', 'dryland', 'mid_altitude', 'highland'],
        7: ['dryland', 'mid_altitude'],
        8: ['dryland', 'mid_altitude'],
        9: ['dryland', 'mid_altitude'],
        10: ['dryland', 'mid_altitude'],
        11: ['dryland', 'mid_altitude', 'highland'],
        12: ['dryland', 'mid_altitude', 'highland'],
        13: ['dryland', 'mid_altitude', 'highland'],
        14: ['dryland', 'mid_altitude', 'highland'],
        15: ['coastal', 'dryland', 'mid_altitude', 'highland'],
        16: ['dryland', 'mid_altitude', 'highland'],
        17: ['dryland', 'mid_altitude', 'highland'],
        18: ['mid_altitude', 'highland'],
        19: ['mid_altitude', 'highland'],
        20: ['mid_altitude', 'highland'],
        21: ['dryland', 'mid_altitude', 'highland'],
        22: ['dryland', 'mid_altitude', 'highland'],
        23: ['dryland', 'mid_altitude'],
        24: ['dryland', 'mid_altitude', 'highland'],
        25: ['dryland', 'mid_altitude', 'highland'],
        26: ['dryland', 'mid_altitude', 'highland'],
        27: ['mid_altitude', 'highland'],
        28: ['dryland', 'mid_altitude', 'highland'],
        29: ['mid_altitude', 'highland'],
        30: ['dryland', 'mid_altitude', 'highland'],
        31: ['dryland', 'mid_altitude', 'highland'],
        32: ['mid_altitude', 'highland'],
        33: ['dryland', 'mid_altitude', 'highland'],
        34: ['dryland', 'mid_altitude', 'highland'],
        35: ['mid_altitude', 'highland'],
        36: ['mid_altitude', 'highland'],
        37: ['mid_altitude', 'highland'],
        38: ['mid_altitude', 'highland'],
        39: ['dryland', 'mid_altitude', 'highland'],
        40: ['dryland', 'mid_altitude', 'highland'],
        41: ['coastal', 'dryland', 'mid_altitude', 'highland'],
        42: ['coastal', 'dryland', 'mid_altitude', 'highland'],
        43: ['dryland', 'mid_altitude', 'highland'],
        44: ['dryland', 'mid_altitude', 'highland'],
        45: ['dryland', 'mid_altitude', 'highland'],
        46: ['dryland', 'mid_altitude', 'highland'],
        47: ['dryland', 'mid_altitude', 'highland'],
        };
        for(var i = 0; i < county_zones[county].length; i++){
            var eco = county_zones[county][i];
            if(eco == "coastal"){
                const option = document.createElement('option');
                option.value = "coastal";
                option.innerHTML = 'Coastal & Dryland (0-900)';
                zone_element.appendChild(option);
            }
            if(eco == "dryland"){
                const option = document.createElement('option');
                option.value = "dryland";
                option.innerHTML = 'Dryland to Mid Altitude (900-1200)';
                zone_element.appendChild(option);
            }
            if(eco == "mid_altitude"){
                const option = document.createElement('option');
                option.value = "mid_altitude";
                option.innerHTML = 'Mid Altitude (1200-1800)';
                zone_element.appendChild(option);
            }
            if(eco == "highland"){
                const option = document.createElement('option');
                option.value = "highland";
                option.innerHTML = 'High Altitude (above 1800)';
                zone_element.appendChild(option);
            }
        }
        
});

$('document').ready(function(){
    //filtering section  **********************************************************
        //toggling the categories
    var limit = 1;
    $('input[type=checkbox].maturity').on('change', function(){
        // if the number of checked maturity boxes is greater than 1, uncheck
        if($('input[type=checkbox].maturity:checked').length > limit){
            $('input[type=checkbox].maturity:checked').prop("checked", false);
            this.checked = true;
        }
    });
    $('input[type=checkbox].season').on('change', function(){
        // if the number of checked maturity boxes is greater than 1, uncheck
        if($('input[type=checkbox].season:checked').length > limit){
            $('input[type=checkbox].season:checked').prop("checked", false);
            this.checked = true;
        }
    });
    $('input[type=checkbox].drought').on('change', function(){
        // if the number of checked maturity boxes is greater than 1, uncheck
        if($('input[type=checkbox].drought:checked').length > limit){
            $('input[type=checkbox].drought:checked').prop("checked", false);
            this.checked = true;
        }
    });
    $('input[type=checkbox].disease').on('change', function(){
        // if the number of checked maturity boxes is greater than 1, uncheck
        if($('input[type=checkbox].disease:checked').length > limit){
            $('input[type=checkbox].disease:checked').prop("checked", false);
            this.checked = true;
        }
    });
    $('input[type=checkbox].consumer').on('change', function(){
        // if the number of checked maturity boxes is greater than 1, uncheck
        if($('input[type=checkbox].consumer:checked').length > limit){
            $('input[type=checkbox].consumer:checked').prop("checked", false);
            this.checked = true;
        }
    });
    $('input[type=checkbox].storage').on('change', function(){
        // if the number of checked maturity boxes is greater than 1, uncheck
        if($('input[type=checkbox].storage:checked').length > limit){
            $('input[type=checkbox].storage:checked').prop("checked", false);
            this.checked = true;
        }
    });
});

document.getElementById("seed_form").addEventListener('submit', function(e){
    //prevent default
    e.preventDefault();
    if($( "#county" ).val() =='' || $( "#zone" ).val() =='' || $( "#crop" ).val() ==''){
        e.preventDefault(); 
    }else{
        //console.log("okay");
    }

    var county = document.getElementById("county").value;
    var zone = document.getElementById("zone").value;
    //changing zone to match the backend
    if(zone == "coastal"){
        zone = "COASTAL OR DRYLAND";
    }
    if(zone == "dryland"){
        zone = "DRYLAND TO MID ALTITUDE TRANSITION";
    }
    if(zone == "mid_altitude"){
        zone = "MID ALTITUDE";
    }
    if(zone == "highland"){
        zone = "HIGHLAND";
    }

    var crop = document.getElementById("crop").value;

    //get the selected categories
    var category_elements = $('input[type=checkbox]:checked');
    var category = {};
    for(var i = 0; i<category_elements.length; i++){
        var key = 'category'+ (i+1);
        var value = category_elements[i].value;
        category[key] = value;
    }
    //category = JSON.stringify(category);
    console.log(category);
    //CATEGORY 1
    //if(category[])
    

    var mbegu_database =  firebase.database().ref("mbegu_database/");
    //read the data once from the database
    //we dont expect it to keep on changing while the user is searching the right product
    var mbegu_database_array=[];
  
      //read the database once and store the information into an array
    mbegu_database.once('value')
    .then((SnapShotRecords) => {
      SnapShotRecords.forEach(function(childSnapShotRecords){
        //key record
        var childKey = childSnapShotRecords.key;
        //data values
        var childData = childSnapShotRecords.val();
        //console.log(childData);
        mbegu_database_array.push(childData);

      });
    })
    .then((mbegu_array) =>{

      var mbegu_array=[];
      mbegu_array= mbegu_database_array;
      //get only the results of the ecological zone that the user has selected and the 
      var results =  mbegu_array.filter(item => item.ECOLOGICAL_ZONE == zone && item.CROP == crop);
        // Category 1

      if (category["category1"] == "Default"){
          // do not filter
      }else if(category["category1"] == "Extra_Early"){
        results =  results.filter(item => item.EXTRA_EARLY == "Y");
      }else if(category["category1"] == "Early"){
        results =  results.filter(item => item.EARLY == "Y");
      }else if(category["category1"] == "Medium"){
        results =  results.filter(item => item.MEDIUM == "Y");
      }else if(category["category1"] == "Late"){
        results =  results.filter(item => item.LATE == "Y");
      }
        // Category 2

    if (category["category2"] == "Default"){
        // do not filter
    }else if(category["category2"] == "Short"){
        results =  results.filter(item => item.SHORT_RAIN == "Y");
    }else if(category["category2"] == "Long"){
        results =  results.filter(item => item.LONG_RAIN == "Y");
    }else if(category["category2"] == "Both"){
        results =  results.filter(item => item.BOTH == "Y");
    }
    // Category 3

    if (category["category3"] == "Default"){
        // do not filter
    }else if(category["category3"] == "Yes"){
        results =  results.filter(item => item.DROUGHT_TOLERANT == "Y");
    }else if(category["category3"] == "No"){
        results =  results.filter(item => item.DROUGHT_TOLERANT == "N");
    }
    // Category 4

    if (category["category4"] == "Default"){
        // do not filter
    }else if(category["category4"] == "Yes"){
        results =  results.filter(item => item.DISEASE_TOLERANT == "Y");
    }else if(category["category4"] == "No"){
        results =  results.filter(item => item.DISEASE_TOLERANT == "N");
    }
    // Category 5

    if (category["category5"] == "Default"){
        // do not filter
    }else if(category["category5"] == "Yes"){
        results =  results.filter(item => item.CONSUMER_PREFERED == "Y");
    }else if(category["category5"] == "No"){
        results =  results.filter(item => item.CONSUMER_PREFERED == "N");
    }
    // Category 6

    if (category["category6"] == "Default"){
        // do not filter
    }else if(category["category6"] == "Yes"){
        results =  results.filter(item => item.STORAGE_AND_FIELD_PEST_RESISTANCE == "Y");
    }else if(category["category6"] == "No"){
        results =  results.filter(item => item.STORAGE_AND_FIELD_PEST_RESISTANCE == "N");
    }
        //results div
      const results_div = document.getElementById('results');
      results_div.replaceChildren();
      
      const results_counter = document.getElementById("results_counter");
      results_counter.innerText = "Results Found : " + results.length;
      for(var i = 0; i<results.length; i++){
          var current_crop = results[i].CROP;
          var current_zone = results[i].ECOLOGICAL_ZONE;
          var current_variety = results[i].VARIETY;
          var current_year = results[i].YEAR;
          var current_type = results[i].TYPE;
          var current_agent = results[i].AGENTS;
          var current_altitude = results[i].MASL;
          var current_maturity = results[i].MATURITY;
          var current_uniqueness = results[i].UNIQUENESS;
          var current_extra_early = results[i].EXTRA_EARLY;
          var current_early = results[i].EARLY;
          var current_medium = results[i].MEDIUM;
          var current_late = results[i].LATE;
          var current_drought = results[i].DROUGHT_TOLERANT;
          var current_disease = results[i].DISEASE_TOLERANT;
          var current_storage = results[i].STORAGE_AND_FIELD_PEST_RESISTANCE;
          var current_consumer = results[i].CONSUMER_PREFERED;
          var current_short = results[i].SHORT_RAIN;
          var current_long = results[i].LONG_RAIN;
          var current_both = results[i].BOTH;

          const parent_div = document.createElement('div');
          parent_div.classList.add("video-card");
          parent_div.classList.add("col-xl-4");
          parent_div.classList.add("col-sm-12");
          parent_div.classList.add("mb-6");

          const current_table = document.createElement('table');

          current_table.classList.add("result_table");
          current_table.style.backgroundColor = "#113f55";
          current_table.style.opacity = "1";
          current_table.style.color = "#f0f4fc";
         
          current_table.innerHTML = `<tr class="result_row"><td class="result_label">County</td><td class="result_cell">${county}</td></tr>
          <tr class="result_row"><td class="result_label">Crop</td><td class="result_cell">${current_crop}</td></tr>
          <tr class="result_row"><td class="result_label">Zone</td><td class="result_cell">${current_zone}</td></tr>
          <tr class="result_row"><td class="result_label">Variety</td><td class="result_cell">${current_variety}</td></tr>
          <tr class="result_row"><td class="result_label">Year</td><td class="result_cell">${current_year}</td></tr>
          <tr class="result_row"><td class="result_label">Breed Type</td><td class="result_cell">${current_type}</td></tr>
          <tr class="result_row"><td class="result_label">Distributed by</td><td class="result_cell">${current_agent}</td></tr>
          <tr class="result_row"><td class="result_label">Altitude Range:</td><td class="result_cell">${current_altitude}</td></tr>
          <tr class="result_row"><td class="result_label">Maturity</td><td class="result_cell">${current_maturity}</td></tr>
          <tr class="result_row"><td class="result_label">Special Attributes</td><td class="result_cell">${current_uniqueness}</td></tr>
          <tr class="result_row"><td class="result_label">Extra Early Maturity</td><td class="result_cell">${current_extra_early}</td></tr>
          <tr class="result_row"><td class="result_label">Early Maturity</td><td class="result_cell">${current_early}</td></tr>
          <tr class="result_row"><td class="result_label">Medium maturity</td><td class="result_cell">${current_medium}</td></tr>
          <tr class="result_row"><td class="result_label">Late Maturity</td><td class="result_cell">${current_late}</td></tr>
          <tr class="result_row"><td class="result_label">Drought Resistant</td><td class="result_cell">${current_drought}</td></tr>
          <tr class="result_row"><td class="result_label">Disease Resistant</td><td class="result_cell">${current_disease}</td></tr>
          <tr class="result_row"><td class="result_label">Field Pest & Storage Pest Resistant</td><td class="result_cell">${current_storage}</td></tr>
          <tr class="result_row"><td class="result_label">Has been rated by consumers</td><td class="result_cell">${current_consumer}</td></tr>
          <tr class="result_row"><td class="result_label">Short Rains</td><td class="result_cell">${current_short}</td></tr>
          <tr class="result_row"><td class="result_label">Long Rains</td><td class="result_cell">${current_long}</td></tr>
          <tr class="result_row"><td class="result_label">Both(long & short rains)</td><td class="result_cell">${current_both}</td></tr>
          `;
          parent_div.appendChild(current_table);

          results_div.appendChild(parent_div);
      }
      console.log(results);
      
    });
    
});


