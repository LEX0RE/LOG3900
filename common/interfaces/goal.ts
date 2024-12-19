import { GoalType } from '@common/enums/goal-type';

export interface CommonGoal {
    isCompleted: boolean;
    description: string;
    type: GoalType;
    bonus: number;
}
