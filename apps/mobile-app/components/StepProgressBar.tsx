import { View } from 'react-native';

const StepsProgressBar = ({ step, steps }: { step: string; steps: string[] }) => {
  const getProgressSteps = () => {
    const currentStepIndex = steps.findIndex(s => s === step);
    return steps.map((_, index) => index <= currentStepIndex);
  };

  const progressSteps = getProgressSteps();

  return (
    <View className="w-full flex-row justify-between">
      {progressSteps.map((isActive, index) => (
        <View key={index} className="flex-1 flex-row items-center">
          <View
            className={`h-[5px] flex-1 ${index === 0 ? 'rounded-l-full' : ''} ${index === progressSteps.length - 1 ? 'rounded-r-full' : ''} ${isActive ? 'bg-primary' : 'bg-gray-200'}`}
          />
        </View>
      ))}
    </View>
  );
};

export default StepsProgressBar;
