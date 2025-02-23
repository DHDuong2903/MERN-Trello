import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { mapOrder } from "~/utils/sorts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import {
  fetchBoardDetailsAPI,
  updateBoardDetailsAPI,
  moveCardToDifferentColumnAPI,
  createNewColumnAPI,
  updateColumnDetailsAPI,
  deleteColumnDetailsAPI,
  createNewCardAPI,
} from "~/apis";
import { generatePlaceholderCard } from "~/utils/formatters";
import { isEmpty } from "lodash";

const Board = () => {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "67a70e5fa316e8e86e3efab4";
    // Call API
    fetchBoardDetailsAPI(boardId).then((board) => {
      board.columns = mapOrder(board.columns, board.columnOrderIds, "_id");
      // Xu ly keo tha vao mot column rong
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
        }
      });
      setBoard(board);
    });
  }, []);

  // Nhiem vu cua ham: Goi API tao moi Column va lam lai du lieu State Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    });

    createdColumn.cards = [generatePlaceholderCard(createdColumn)];
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];

    // Cap nhat lai State Board
    const newBoard = { ...board };
    newBoard.columns.push(createdColumn);
    newBoard.columnOrderIds.push(createdColumn._id);
    setBoard(newBoard);
  };

  // Nhiem vu cua ham: Goi API tao moi Card va lam lai du lieu State Board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id,
    });

    // Cap nhat lai State Board
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find((column) => column._id === createdCard.columnId);
    if (columnToUpdate) {
      if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard];
        columnToUpdate.cardOrderIds = [createdCard._id];
      } else {
        columnToUpdate.cards.push(createdCard);
        columnToUpdate.cardOrderIds.push(createdCard._id);
      }
    }
    setBoard(newBoard);
  };

  // Nhiem vu ham: Goi API va xu ly khi keo tha column xong xuoi
  const moveColumns = (dndOrderedColumns) => {
    // Update cho chuan du lieu State Board
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    // Goi API update board
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds });
  };

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    // Update cho chuan du lieu State Board
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find((column) => column._id === columnId);
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards;
      columnToUpdate.cardOrderIds = dndOrderedCardIds;
    }
    setBoard(newBoard);
    // Goi API update board
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds });
  };

  // B1: Cap nhat mang cardOrderIds cua Column ban dau chua no (xoa _id cua Card ra khoi mang)
  // B2: Cap nhat mang cardOrderIds cua Column tiep theo (them _id cua Card vao mang)
  // B3: Cap nhat lai truong columnId moi cua cai Card da keo
  // => Lam moi mot API rieng

  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    // Update cho chuan du lieu State Board
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    // Goi API xu ly phia BE
    let prevCardOrderIds = dndOrderedColumns.find((c) => c._id === prevColumnId)?.cardOrderIds;
    let nextCardOrderIds = dndOrderedColumns.find((c) => c._id === nextColumnId)?.cardOrderIds;

    // Xu ly keo Card cuoi cung ra khoi Column, Column rong co placeholder card, can xoa no di
    if (prevCardOrderIds[0].includes("placeholder-card")) prevCardOrderIds = [];
    // if (nextCardOrderIds[0].includes("placeholder-card")) nextCardOrderIds.shift();
    if (nextCardOrderIds?.length) {
      nextCardOrderIds = nextCardOrderIds.filter((_id) => !_id.includes("placeholder-card"));
    }

    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds,
    });
  };

  const deleteColumnDetails = (columnId) => {
    // Update chuan du lieu State Board
    const newBoard = { ...board };
    newBoard.columns = newBoard.columns.filter((c) => c._id !== columnId);
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter((_id) => _id !== columnId);
    setBoard(newBoard);

    // Goi API xu ly phia BE
    deleteColumnDetailsAPI(columnId).then((res) => {
      toast.success(res?.deleteResult);
    });
  };

  if (!board) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "100vw",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    );
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
        deleteColumnDetails={deleteColumnDetails}
      />
    </Container>
  );
};

export default Board;
