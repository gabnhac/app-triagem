import { RiskLegend } from '@/components/RiskLegend';
import { HealthRisk } from '@/components/RiskLegend/types';
import theme from '@/theme';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';


export default function Presentation() {
  const [selected, setSelected] = useState<HealthRisk | null>(null);

  function handleSelect(item: HealthRisk) {
    if (selected === item) {
      setSelected(null);
      return
    }

    setSelected(item);
  }

  return (
    <ScrollView
      style={styles.wrapper}
      contentContainerStyle={{ gap: 10, paddingVertical: 10 }}

    >
      <Text style={styles.text}>Este aplicativo inclui um formulário com perguntas pontuadas. Com base nas respostas, é feita uma estimativa de risco para cada categoria abaixo.</Text>
      <Text style={styles.text}>Ao expandir um item, é possível visualizar os níveis de cada risco.</Text>
      <RiskLegend type='cardiovascular' isSelected={selected === 'cardiovascular'} onSelect={handleSelect} />
      <RiskLegend type='dislipidemia' isSelected={selected === 'dislipidemia'} onSelect={handleSelect} />
      <RiskLegend type='dpoc' isSelected={selected === 'dpoc'} onSelect={handleSelect} />
      <RiskLegend type='asma' isSelected={selected === 'asma'} onSelect={handleSelect} />
      <RiskLegend type='diabetes_tipo2' isSelected={selected === 'diabetes_tipo2'} onSelect={handleSelect} />
      <RiskLegend type='hipertensao' isSelected={selected === 'hipertensao'} onSelect={handleSelect} />
      <RiskLegend type='obesidade' isSelected={selected === 'obesidade'} onSelect={handleSelect} />
      <RiskLegend type='dor_cronica' isSelected={selected === 'dor_cronica'} onSelect={handleSelect} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  text: {
    color: theme.colors.textDefault,
    paddingHorizontal: 5
  }
});
