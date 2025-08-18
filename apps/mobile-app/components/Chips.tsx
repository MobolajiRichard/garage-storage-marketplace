import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface ChipsProps {
  text: string;
  onPress: () => void;
  onDelete?: () => void;
  active?: boolean;
  cross?: boolean;
}

const Chips = ({ text, onPress, onDelete, active = false, cross = true }: ChipsProps) => {
  return (
    <Pressable
      className={twMerge(
        'flex-row items-center gap-px rounded-full bg-gray-100 px-3 py-2',
        active && 'bg-primary'
      )}
      onPress={onPress}
    >
      <Text className={twMerge('text-[12px] font-semibold', active && 'text-white')}>{text}</Text>
      {active && cross && (
        <Pressable onPress={onDelete}>
          <Feather name='x' size={16} color="white" strokeWidth={1.5} />
        </Pressable>
      )}
    </Pressable>
  );
};

export default Chips;
