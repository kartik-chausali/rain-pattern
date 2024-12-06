/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

export default function Rain({rows= 15 , cols=20}){
    const [rainDrops , setRainDrops] = useState([]);

    useEffect(()=>{
    const interval = setInterval(()=>{
        setRainDrops((prevDrops)=>{

            const newRainGroup = [];
            const startCol = Math.floor(Math.random() * cols); // Ensure enough space for 5 columns
            const baseColor = Math.random() * 360; // Random base color for the group
    
            // Generate a group of 5 drops with varying shades
            for (let i = 0; i < 5; i++) {
              newRainGroup.push({
                row:i,
                col: startCol,
                color: `hsl(${baseColor}, 100%, ${80 - i * 15}%)`, // Decreasing brightness for each drop
              });
            }

            const updatedDrops = prevDrops.map((drop)=> ({...drop , row:drop.row+1})).filter((drop)=> drop.row < rows);

            return [...updatedDrops , ...newRainGroup];
        });

        return ()=> clearInterval(interval);
    },400)
       
    },[rows, cols])
    return <div style={{
        display: "grid",
        gridTemplateRows: `repeat(${rows}, 20px)`,
        gridTemplateColumns: `repeat(${cols}, 20px)`,
        gap: "2px",
        position: "relative",
      }}>

{[...Array(rows * cols)].map((_, idx) => {
        const row = Math.floor(idx / cols);
        const col = idx % cols;

        const drop = rainDrops.find((d) => d.row === row && d.col === col);

        return (
          <div
            key={idx}
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: drop ? drop.color : "black",
              transition: "background-color 0.1s",
            }}
          />
        );
      })}
    </div>
}