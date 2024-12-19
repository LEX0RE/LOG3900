import 'package:Scrabble/data/models/classes/placement.dart';
import 'package:Scrabble/data/models/enums/orientation_type.dart';

import 'fake_letters.dart';

final FAKE_PLACEMENT_1 = () => Placement(FAKE_POSITION_LETTER_LIST_1(), OrientationType.Horizontal, FAKE_COORDINATE_1());

final String FAKE_PLACEMENT_1_COMMAND = FAKE_PLACEMENT_1().toString();
