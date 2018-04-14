/* 导出城市地区模型 */
import proData from './proData';
import cityData from './cityData';
import countryData from './countryData';

export default function getModelData(){
    const data = [];
    for(let i = 0; i < proData.length; i++){
        const proData_ = {}
        proData_.label = proData_.value  = proData[i].pv;
        proData_.children = [];
        for(let j=0; j < cityData.length; j++ ){
            if(proData[i].pk === cityData[j].pk){
                const cityData_ = {};
                cityData_.label = cityData_.value = cityData[j].cv;
                proData_.children.push(cityData_);
                cityData_.children = [];
                for(let z = 0; z < countryData.length; z++){
                    if(cityData[j].ck === countryData[z].ck){
                        const countryData_ = {};
                        countryData_.label = countryData_.value = countryData[z].cyv;
                        cityData_.children.push(countryData_);
                    }
                }
            }
            proData_.children.children = [];
        }
        data.push(proData_);
    }
    return data;
}