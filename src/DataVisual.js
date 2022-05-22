import { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
const axios = require('axios').default;

const DataVisual = () => {
    const [data, setData] = useState([]);
  /*   const data=[
        { title: 'One', value: 10, color: '#E38627' },
        { title: 'Two', value: 15, color: '#C13C37' },
        { title: 'Three', value: 20, color: '#6A2135' },
      ]; */

      useEffect(()=>{
          const getData=async()=>{
              try {
                  const res = await axios.get("https://gorest.co.in/public/v2/users");

                  const result = await res.data;
                  const maleArr = await result.filter(item => item.gender == 'male');
                  const femaleArr = await result.filter(item => item.gender == 'female');
                  const arr=[
                    { title: 'Male', value:maleArr.length, color: '#E38627' },
                    { title: 'Female', value: femaleArr.length, color: '#C13C37' },
                
                  ];
                  
                  setData(arr);
                  
              } catch (error) {
                  
              }
          }
          getData();
      },[]);


    return ( 
        <div className="visual">
    <PieChart
              animate
              animationDuration={500}
              animationEasing="ease-out"
              center={[50, 50]}
              data={data}
              lengthAngle={360}
              lineWidth={15}
              paddingAngle={0}
              radius={50}
              rounded
              
              startAngle={0}
              viewBoxSize={[100, 100]}
              label={(data) => data.dataEntry.title}
              labelPosition={65}
              labelStyle={{
                fontSize: "10px",
                fontColor: "FFFFFA",
                fontWeight: "800",
              }}
            />

        </div>
     );
}
 
export default DataVisual;