class JoinableGameSlot {
  final String creator;
  final String turnTime;
  final String dictionary;
  final int nRealPlayers;
  final int nVirtualPlayers;
  final int nObservers;

  const JoinableGameSlot(
      {required this.creator,
      required this.turnTime,
      required this.dictionary,
      required this.nRealPlayers,
      required this.nVirtualPlayers,
      required this.nObservers});
}
