import 'package:Scrabble/logic/cooperative_game_approval/cooperative_game_approval_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/overlay/cooperative_approval_overlay/approval_panel.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class CooperativeApprovalOverLay extends StatelessWidget {
  final double width;
  final double height;
  const CooperativeApprovalOverLay({
    Key? key,
    this.width = 300,
    this.height = 300,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final ColorExtension colorExtension = Theme.of(context).extension<ColorExtension>()!;
    return BlocBuilder<CooperativeGameApprovalCubit, CooperativeGameApprovalState>(
        builder: (BuildContext context, CooperativeGameApprovalState state) {
      if (state is CooperativeGameApprovalInitial) return const SizedBox.shrink();
      return Container(
        width: width,
        height: height,
        decoration: BoxDecoration(
          color: colorExtension.tableColor,
          border: Border.all(color: colorExtension.tableBorderColor!, width: 5),
          borderRadius: BorderRadius.circular(10),
        ),
        child: const ApprovalPanel(),
      );
    });
  }
}
