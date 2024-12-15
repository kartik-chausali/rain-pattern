/* eslint-disable react/prop-types */
import  { useState, useEffect } from "react";

const Rain = ({ rows = 15, cols = 20 }) => {
  const [rainDrops, setRainDrops] = useState([]);
  const [baseColor, setBaseColor] = useState(Math.random() * 360); // Global base color
  const maxGroups = 12; // Restrict to 6 active groups
  const minLightness = 20; // Minimum lightness to avoid black drops

  const clampLightness = (lightness) => {
    // Ensure lightness stays within the range [minLightness, 80]
    return Math.max(minLightness, Math.min(lightness, 80));
  };

  useEffect(() => {
    // Update rain drops at regular intervals
    const interval = setInterval(() => {
      setRainDrops((prevRainDrops) => {
        // Identify the number of active groups in the grid
        const activeGroups = new Set(prevRainDrops.map((drop) => drop.groupId));

        // Only add a new group if active groups are less than the maximum limit
        if (activeGroups.size < maxGroups) {
          const newRainGroup = [];
          const startCol = Math.floor(Math.random() * cols); // Random starting column
          const groupId = Date.now(); // Unique identifier for the group

          // Generate 5 drops for the new group in consecutive rows
          for (let i = 0; i < 5; i++) {
            newRainGroup.push({
              row: i, // Drops appear from the top
              col: startCol,
              groupId, // Assign group ID to drops
            });
          }

          // Move existing drops downward and keep only those in bounds
          const updatedDrops = prevRainDrops
            .map((drop) => ({ ...drop, row: drop.row + 1 }))
            .filter((drop) => drop.row < rows); // Remove drops that fall off the grid

          return [...updatedDrops, ...newRainGroup];
        }

        // If the max group limit is reached, just move existing drops downward
        return prevRainDrops
          .map((drop) => ({ ...drop, row: drop.row + 1 }))
          .filter((drop) => drop.row < rows); // Remove drops that fall off the grid
      });
    }, 200); // Adjust interval for drop speed

    return () => clearInterval(interval);
  }, [cols, rows, maxGroups]);

  // Change the global base color every 5 seconds
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setBaseColor(Math.random() * 360); // Randomly change the hue value
    }, 2000);

    return () => clearInterval(colorInterval);
  }, []);

  return (
    <div
      className={`grid relative gap-1`}
      style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      }}
    >
      {[...Array(rows * cols)].map((_, idx) => {
        const row = Math.floor(idx / cols);
        const col = idx % cols;

        const drop = rainDrops.find((d) => d.row === row && d.col === col);

        return (
          <div
            key={idx}
            className={`w-5 h-5 transition-colors duration-1000`}
            style={{
              backgroundColor: drop
                ? `hsl(${baseColor}, 100%, ${clampLightness(
                    80 - drop.row * 15
                  )}%)`
                : "#1a1a2e", // Default background color
            }}
          />
        );
      })}
    </div>
  );
};

export default Rain;
