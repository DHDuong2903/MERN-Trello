import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";

import { DndContext, PointerSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

const BoardContent = ({ board }) => {
  // Yeu cau chuot di chuyen 10px thi moi kich hoat event, click khong goi event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
  // Nhan giu 250ms va dung sai cam ung 500px thi moi kich hoat event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } });

  const sensors = useSensors(mouseSensor, touchSensor);

  const [orderedColumns, setOrderedColumns] = useState([]);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    // Neu vi tri sau khi keo tha khac voi ban dau
    if (active.id !== over.id) {
      // Lay vi tri cu cua active
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);
      // Lay vi tri moi cua over
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id);
      // Dung arrayMove de sap xep lai mang Columns ban dau
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);

      const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);

      // Cap nhat lai state columns ban dau sau khi keo tha
      setOrderedColumns(dndOrderedColumns);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === "dark" ? "#34495e" : "#1976d2"),
          width: "100%",
          height: (theme) => theme.trello.boardContentHeight,
          p: "10px 0",
        }}
      >
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  );
};

export default BoardContent;
