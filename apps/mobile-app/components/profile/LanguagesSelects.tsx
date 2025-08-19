import { LANGUAGES } from '@/constants/languages';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { twMerge } from 'tailwind-merge';

const LanguageSelects = ({
  selectedLanguages,
  setSelectedLanguages,
  isDisabled = false,
}: {
  selectedLanguages: string[];
  setSelectedLanguages: (languages: string[]) => void;
  isDisabled?: boolean;
}) => {
  return (
    <ScrollView>
      <View className="gap-2">
        {LANGUAGES.map(language => (
          <Pressable
            key={language.code}
            onPress={() => {
              if (selectedLanguages.includes(language.code)) {
                setSelectedLanguages(selectedLanguages.filter(lang => lang !== language.code));
              } else {
                if (isDisabled) return;
                setSelectedLanguages([...selectedLanguages, language.code]);
              }
            }}
            className={twMerge(
              'flex-row items-center justify-between rounded-lg border border-gray-400 p-4',
              isDisabled && !selectedLanguages.includes(language.code) && 'opacity-50'
            )}
          >
            <Text>{language.name}</Text>
            <View className="h-6 w-6 items-center justify-center rounded-full border border-gray-400">
              {selectedLanguages.includes(language.code) && (
                <View className="bg-primary h-4 w-4 rounded-full" />
              )}
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default LanguageSelects;
