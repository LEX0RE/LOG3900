part of 'trade_cubit.dart';

@immutable
abstract class TradeState with EquatableMixin {
  final List<int> indexes;

  @override
  List<Object> get props => [indexes];

  const TradeState(this.indexes);
}

class TradeInitial extends TradeState {
  TradeInitial() : super([]);
}

class TradeUpdated extends TradeState {
  TradeUpdated(List<int> indexes) : super(List.from(indexes));
}
