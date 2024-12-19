import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/data/models/classes/letters/position_index_letter.dart';
import 'package:Scrabble/data/models/classes/letters/position_letter.dart';
import 'package:Scrabble/data/models/interfaces/game_info/board_update.dart';
import 'package:Scrabble/data/models/interfaces/game_info/common_tile.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

part 'board_holder_state.dart';

class BoardHolderCubit extends Cubit<BoardHolderState> {
  BoardUpdate? boardUpdate;
  final SocketManagerBloc socketManager;

  BoardHolderCubit(this.socketManager) : super(BoardHolderInitial()) {
    socketManager.add(SocketManagerAddHandler(BOARD_UPDATE, handleBoardUpdate, typeFactory: BoardUpdate.fromJson));
  }

  void handleBoardUpdate(dynamic boardUpdate) {
    if (boardUpdate is! BoardUpdate) return;

    this.boardUpdate = boardUpdate;
    emit(BoardHolderUpdated(boardUpdate.board.tiles.toPositionLetter().toGrid()));
  }

  void clearBoard() {
    boardUpdate = null;
    emit(BoardHolderInitial());
  }
}
