import 'package:Scrabble/data/models/interfaces/identity.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';

import 'fake_user_interface.dart';

final FAKE_IDENTITY = () => const Identity(user: User(FAKE_USER_NAME_1, FAKE_USER_ID), token: FAKE_TOKEN_1);

final FAKE_IDENTITY_STATE = () => IdentityAvailable(FAKE_IDENTITY(), FAKE_USER_1());
