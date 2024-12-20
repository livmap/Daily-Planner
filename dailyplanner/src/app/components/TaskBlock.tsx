interface TaskBlockProps {
    task: {
      name: string;
      time: string;
      color: string;
    };
    startHour: number;
    timeRange: number[];
  }
  
  export default function TaskBlock({ task, timeRange }: TaskBlockProps) {
    // Safely split the time into hours and minutes
    const [taskHour, taskMinute] = task.time
      ? task.time.split(":").map((val) => parseInt(val, 10))
      : [null, null];
  
    // Validate and calculate grid column position
    const columnStart =
      taskHour !== null && timeRange.includes(taskHour)
        ? timeRange.indexOf(taskHour) + 1
        : 0;
  
    // If columnStart is invalid, skip rendering the task
    if (columnStart === 0) return null;
  
    // Calculate row position, default to row 1 if invalid
    const rowStart =
      taskMinute !== null && !isNaN(taskMinute)
        ? Math.floor((taskMinute / 60) * 6) + 1
        : 1;
  
    return (
      <div
        className="text-white text-center p-2 rounded-lg shadow-md"
        style={{
          gridColumnStart: columnStart,
          gridRowStart: rowStart,
          gridRowEnd: `span 6`, // Adjust task height to span 1 hour
          backgroundColor: task.color || "#999", // Fallback color
        }}
      >
        <span className="text-sm font-semibold">{task.name || "No Name"}</span>
        <br />
        <span className="text-xs">{task.time || "00:00"}</span>
      </div>
    );
  }