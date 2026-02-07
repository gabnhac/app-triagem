import { Icon } from '@/components/Icon';
import { Input } from '@/components/Input';
import { InputDate } from '@/components/InputDate';
import { InputSelect } from '@/components/InputSelect/input';
import { OptionType } from '@/components/InputSelect/input.types';
import { RiskLegendResultProps } from '@/store/storeTypes';
import { useAppStore } from '@/store/useAppStore';
import theme from '@/theme';
import { calculateRiskAsma } from '@/utils/Risks/asma/asma';
import { calculateRiskCardiovascularAndDislipidemia, calculateScoreCardiovascularAndDislipidemia } from '@/utils/Risks/cardiovascularDislipidemia/cardiovascularAndDislipidemia';
import { calculateRiskDiabetesTipo2, calculateScoreDiabetesTipo2 } from '@/utils/Risks/diabetesTipo2/diabetesTipo2';
import { calculateRiskDorCronica } from '@/utils/Risks/dorCronica/dorCronica';
import { calculateRiskDPOC } from '@/utils/Risks/dpoc/dpoc';
import { calculateRiskHipertensao } from '@/utils/Risks/hipertensao/hipertensao';
import { calculateRiskObesidade, calculateScoreObesidade } from '@/utils/Risks/obesidade/obesidade';
import { calculateAge } from '@/utils/calculateAge';
import { calculateIMC } from '@/utils/calculateIMC';
import { formatBloodPressure } from '@/utils/formatBloodPressure';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { FormState, FormStateError } from './index.types';

export default function InitialForm() {
  const router = useRouter();

  const {
    setResultData,
  } = useAppStore();

  const [formState, setFormState] = useState<FormState>({
    birthDate: (() => {
      const d = new Date();
      d.setFullYear(d.getFullYear() - 20);
      return d;
    })(),
    height: '',
    weight: '',
    isMan: null,
    bloodPressure: '',
    isSmoker: null,
    bloodPressureTreated: null,
    hasDiabetes: null,
    hdl: '',
    ldl: '',
    waistCircumference: '',
    eatVegetablesEveryDay: null,
    practiceExercise: null,
    familyWithDiabetes: null,
    highGlucose: null,
    familyWithObesity: null,
    isAlcoholic: null,
    crisesDPOC: 0,
    grauDispneia: 0,
    sumChronicPain: 0,
    sumDPOC: 0,
    sumAsma: 0
  });

  const [formErros, setFormErrors] = useState<FormStateError>({} as FormStateError);

  function validateForm() {
    let isError = false;

    if (!formState.height) {
      setFormErrors(prev => ({
        ...prev,
        heightError: 'Informe a altura'
      }))
      isError = true;
    }
    if (!formState.bloodPressure) {
      setFormErrors(prev => ({
        ...prev,
        bloodPressureError: 'Informe a pressão sanguinea'
      }))
      isError = true;
    }
    if (!formState.weight) {
      setFormErrors(prev => ({
        ...prev,
        weightError: 'Informe o peso'
      }))
      isError = true;
    }
    if (formState.isMan === null) {
      setFormErrors(prev => ({
        ...prev,
        isManError: true,
      }))
      isError = true;
    }
    if (formState.isSmoker === null) {
      setFormErrors(prev => ({
        ...prev,
        isSmokerError: true
      }))
      isError = true;
    }
    if (formState.bloodPressureTreated === null) {
      setFormErrors(prev => ({
        ...prev,
        bloodPressureTreatedError: true
      }))
      isError = true;
    }
    if (formState.hasDiabetes === null) {
      setFormErrors(prev => ({
        ...prev,
        diabetesError: true
      }))
      isError = true;
    }
    if (!formState.waistCircumference) {
      setFormErrors(prev => ({
        ...prev,
        waistCircumferenceError: "Informe a circunferência da cintura",
      }));
      isError = true;
    }
    if (formState.practiceExercise === null) {
      setFormErrors(prev => ({
        ...prev,
        practiceExerciseError: true,
      }));
      isError = true;
    }
    if (formState.eatVegetablesEveryDay === null) {
      setFormErrors(prev => ({
        ...prev,
        eatVegetablesEveryDayError: true,
      }));
      isError = true;
    }
    if (formState.highGlucose === null) {
      setFormErrors(prev => ({
        ...prev,
        highGlucoseError: true,
      }));
      isError = true;
    }
    if (formState.familyWithDiabetes === null) {
      setFormErrors(prev => ({
        ...prev,
        familyWithDiabetesError: true,
      }));
      isError = true;
    }
    if (formState.familyWithObesity === null) {
      setFormErrors(prev => ({
        ...prev,
        familyWithObesityError: true,
      }));
      isError = true;
    }
    if (formState.isAlcoholic === null) {
      setFormErrors(prev => ({
        ...prev,
        isAlcoholicError: true,
      }));
      isError = true;
    }
    return isError
  }

  function calculateRisk() {
    if (validateForm()) {
      console.log('Há erros');
      Toast.show({
        type: 'error',
        text1: 'Há campos obrigatórios sem preenchimento.',

      })
      return;
    }

    let params: RiskLegendResultProps[] = [];
    setFormErrors({} as FormStateError)

    const age = calculateAge(formState.birthDate);
    const imc = calculateIMC(Number(formState.height), Number(formState.weight));

    const bloodPressureCalculated = formatBloodPressure(formState.bloodPressure, formState.bloodPressureTreated || false);
    if (typeof bloodPressureCalculated === 'string') {
      Toast.show({
        type: 'error',
        text1: bloodPressureCalculated,
      })
      return;
    }

    const scoreCardiovascular = calculateScoreCardiovascularAndDislipidemia({
      age,
      bloodPressure: bloodPressureCalculated,
      imc,
      isCardiovascular: true,
      isDiabetes: formState.hasDiabetes || false,
      isMan: formState.isMan || true,
      isSmoker: formState.isSmoker || false,
      hdl: formState.hdl ? Number(formState.hdl) : undefined,
      ldl: formState.ldl ? Number(formState.ldl) : undefined,
    })
    const riskCardiovascular = calculateRiskCardiovascularAndDislipidemia(scoreCardiovascular, formState.isMan || true, true);

    params.push({
      category: riskCardiovascular.category,
      score: riskCardiovascular.score,
      riskIn10Years: riskCardiovascular.riskIn10Years,
      type: 'cardiovascular',
      probability: null,
      tip: null
    });

    const scoreDislipidemia = calculateScoreCardiovascularAndDislipidemia({
      age,
      bloodPressure: bloodPressureCalculated,
      imc,
      isCardiovascular: false,
      isDiabetes: formState.hasDiabetes || false,
      isMan: formState.isMan || true,
      isSmoker: formState.isSmoker || false,
      hdl: formState.hdl ? Number(formState.hdl) : undefined,
      ldl: formState.ldl ? Number(formState.ldl) : undefined,
    })
    const riskDislipidemia = calculateRiskCardiovascularAndDislipidemia(scoreDislipidemia, formState.isMan || true, false);

    params.push({
      category: riskDislipidemia.category,
      score: riskDislipidemia.score,
      riskIn10Years: riskDislipidemia.riskIn10Years,
      type: 'dislipidemia',
      probability: null,
      tip: null
    });

    const scoreDiabetesTipo2 = calculateScoreDiabetesTipo2({
      age,
      imc,
      bloodPressureMedication: bloodPressureCalculated.isTreated,
      eatVegetablesEveryDay: formState.eatVegetablesEveryDay || true,
      familyWithDiabetes: formState.familyWithDiabetes || 0,
      highGlucose: formState.highGlucose || false,
      practiceExercise: formState.practiceExercise || false,
      waistCircumference: Number(formState.waistCircumference),
      isMan: formState.isMan || true,
    })
    const riskDiabetesTipo2 = calculateRiskDiabetesTipo2(scoreDiabetesTipo2);

    params.push({
      category: riskDiabetesTipo2.classification,
      score: riskDiabetesTipo2.score,
      probability: riskDiabetesTipo2.probability,
      type: 'diabetes_tipo2',
      tip: riskDiabetesTipo2.tip,
      riskIn10Years: null
    });

    const scoreObesidade = calculateScoreObesidade({
      dietIsHealthy: formState.eatVegetablesEveryDay || true,
      familyWithObesity: formState.familyWithObesity || false,
      isAlcoholic: formState.isAlcoholic || false,
      isSmoker: formState.isSmoker || false,
      practiceExercise: formState.practiceExercise || false
    })
    const riskObesidade = calculateRiskObesidade(scoreObesidade);

    params.push({
      category: riskObesidade.classification,
      score: riskObesidade.score,
      type: 'obesidade',
      probability: null,
      riskIn10Years: null,
      tip: null
    });

    const riskHipertensao = calculateRiskHipertensao(bloodPressureCalculated);

    params.push({
      category: riskHipertensao.classification,
      tip: riskHipertensao.tip,
      type: 'hipertensao',
      probability: null,
      riskIn10Years: null,
      score: 0
    });

    const riskDpoc = calculateRiskDPOC({
      cat: formState.sumDPOC,
      crisesDPOC: formState.crisesDPOC,
      grauDispneia: formState.grauDispneia
    });

    params.push({
      category: riskDpoc.category,
      score: riskDpoc.score,
      type: 'dpoc',
      probability: null,
      riskIn10Years: null,
      tip: null
    });

    const riskAsma = calculateRiskAsma(formState.sumAsma);

    params.push({
      category: riskAsma.category,
      score: riskAsma.score,
      type: 'asma',
      probability: null,
      riskIn10Years: null,
      tip: null
    });

    const riskDorCronica = calculateRiskDorCronica(formState.sumChronicPain);

    params.push({
      category: riskDorCronica.category,
      score: riskDorCronica.score,
      type: 'dor_cronica',
      probability: null,
      riskIn10Years: null,
      tip: null
    });

    setResultData(params);

    router.push('/(drawer)/form/results');
  }

  const options0to5 = [
    { affirmative: '0' },
    { affirmative: '1' },
    { affirmative: '2' },
    { affirmative: '3' },
    { affirmative: '4' },
    { affirmative: '5' },
  ];

  function handleSelectDPOC(prevItem: OptionType | null, item: OptionType) {
    const add = Number(item.affirmative);
    const subtract = Number(prevItem?.affirmative ?? 0);

    setFormState(prev => ({
      ...prev,
      sumDPOC: prev.sumDPOC + add - subtract
    }));
  }

  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10, gap: 10, paddingBottom: 200 }}>
      <View style={styles.formWrapper}>
        <View style={styles.titleWrapper}>
          <Text
            style={[styles.title, { color: theme.colors.risk_cardiovascular }]}
          >
            Cardiovascular / <Text style={[styles.title, { color: theme.colors.risk_dislipidemia }]}>Dislipidemia</Text>
          </Text>
        </View>
        <InputSelect
          options={[{
            affirmative: 'Homem',
          }, {
            affirmative: 'Mulher',
          }]}
          statement='Informe seu sexo:'
          onSelect={(prevItem, item) => {
            if (item.affirmative === 'Homem') {
              setFormState(prev => ({
                ...prev,
                isMan: true
              }))
            } else {
              setFormState(prev => ({
                ...prev,
                isMan: false
              }))
            }
          }}
          isError={formErros.isManError}
        />
        <InputSelect
          options={[{
            affirmative: 'Sim',
          }, {
            affirmative: 'Não',
          }]}
          statement='É tagabista?'
          onSelect={(prevItem, item) => {
            if (item.affirmative === 'Sim') {
              setFormState(prev => ({
                ...prev,
                isSmoker: true
              }))
            } else {
              setFormState(prev => ({
                ...prev,
                isSmoker: false
              }))
            }
          }}
          isError={formErros.isSmokerError}
        />
        <InputSelect
          options={[{
            affirmative: 'Sim',
          }, {
            affirmative: 'Não',
          }]}
          statement='Tem diabete?'
          onSelect={(prevItem, item) => {
            if (item.affirmative === 'Sim') {
              setFormState(prev => ({
                ...prev,
                hasDiabetes: true
              }))
            } else {
              setFormState(prev => ({
                ...prev,
                hasDiabetes: false
              }))
            }
          }}
          isError={formErros.diabetesError}
        />
        <InputDate
          label='Nascimento'
          value={formState.birthDate}
          onChangeDate={(date) => {
            setFormState(prev => ({
              ...prev,
              birthDate: date
            }))
          }}
        />
        <Input
          label='Altura (CM)'
          onChangeValue={(height) => {
            setFormState(prev => ({
              ...prev,
              height
            }))
          }}
          value={formState.height}
          placeholder='160'
          mask={[/\d/, /\d/, /\d/]}
          errorMessage={formErros.heightError}
        />
        <Input
          label='Peso (KG)'
          onChangeValue={(weight) => {
            setFormState(prev => ({
              ...prev,
              weight
            }))
          }}
          value={formState.weight}
          placeholder='60KG'
          mask={[/\d/, /\d/, /\d/]}
          errorMessage={formErros.weightError}
        />
        <Input
          label='Colesterol ruim (LDL)'
          onChangeValue={(text) => setFormState(prev => ({
            ...prev,
            ldl: text
          }))}
          value={formState.ldl || ''}
          variant='secondary'
          placeholder='100'
          mask={[/\d/, /\d/, /\d/]}
        />
        <Input
          label='Colesterol bom (HDL)'
          onChangeValue={(text) => setFormState(prev => ({
            ...prev,
            hdl: text
          }))}
          value={formState.hdl || ''}
          variant='secondary'
          placeholder='60'
          mask={[/\d/, /\d/, /\d/,]}
        />

        <View style={styles.titleWrapper}>
          <Text
            style={[styles.title, { color: theme.colors.risk_hipertensao }]}
          >
            Hipertensão
          </Text>
        </View>
        <Input
          label='Pressão arterial'
          onChangeValue={(bloodPressure) => {
            setFormState(prev => ({
              ...prev,
              bloodPressure
            }))
          }}
          value={formState.bloodPressure}
          placeholder='120/80'
          mask={[/\d/, /\d/, /\d/, '/', /\d/, /\d/]}
          errorMessage={formErros.bloodPressureError}
        />
        <InputSelect
          options={[{
            affirmative: 'Sim',
          }, {
            affirmative: 'Não',
          }]}
          statement='A pressão arterial é tratada?'
          onSelect={(prevItem, item) => {
            if (item.affirmative === 'Sim') {
              setFormState(prev => ({
                ...prev,
                bloodPressureTreated: true
              }))
            } else {
              setFormState(prev => ({
                ...prev,
                bloodPressureTreated: false
              }))
            }
          }}
          isError={formErros.bloodPressureTreatedError}
        />


        <View style={styles.titleWrapper}>
          <Text
            style={[styles.title, { color: theme.colors.risk_diabetes }]}
          >
            Diabetes tipo 2
          </Text>
        </View>
        <Input
          label='Circunferência da cintura'
          onChangeValue={(value) => {
            setFormState(prev => ({
              ...prev,
              waistCircumference: value
            }))
          }}
          value={formState.waistCircumference}
          placeholder='70'
          mask={[/\d/, /\d/, /\d/]}
          errorMessage={formErros.waistCircumferenceError}
        />
        <InputSelect
          options={[{
            affirmative: 'Sim',
          }, {
            affirmative: 'Não',
          }]}
          statement='Pratica pelo menos 30 minutos de atividade?'
          onSelect={(prevItem, item) => {
            if (item.affirmative === 'Sim') {
              setFormState(prev => ({
                ...prev,
                practiceExercise: true
              }))
            } else {
              setFormState(prev => ({
                ...prev,
                practiceExercise: false
              }))
            }
          }}
          isError={formErros.practiceExerciseError}
        />
        <InputSelect
          options={[{
            affirmative: 'Todos os dias',
          }, {
            affirmative: 'De vez em quando',
          }]}
          statement='Com que frequência come legumes, verduras, frutas e grãos?'
          onSelect={(previtem, item) => {
            if (item.affirmative === 'Todos os dias') {
              setFormState(prev => ({
                ...prev,
                eatVegetablesEveryDay: true
              }))
            } else {
              setFormState(prev => ({
                ...prev,
                eatVegetablesEveryDay: false
              }))
            }
          }}
          isError={formErros.eatVegetablesEveryDayError}
        />
        <InputSelect
          options={[{
            affirmative: 'Sim',
          }, {
            affirmative: 'Não',
          }]}
          statement='Alguma vez você já apresentou glicose alta no sangue (por exemplo, em um exame médico de rotina, durante uma doença, durante a gravidez)?'
          onSelect={(prevItem, item) => {
            if (item.affirmative === 'Sim') {
              setFormState(prev => ({
                ...prev,
                highGlucose: true
              }))
            } else {
              setFormState(prev => ({
                ...prev,
                highGlucose: false
              }))
            }
          }}
          isError={formErros.highGlucoseError}
        />
        <InputSelect
          options={[{
            affirmative: 'Sim: tio, avô ou primo.',
          }, {
            affirmative: 'Sim: mãe, pai, irmão ou filho.',
          },
          {
            affirmative: 'Não',
          }
          ]}
          statement='Algum membro de sua família ou parente próximo já foi diagnosticado com diabetes?'
          onSelect={(prevItem, item) => {
            if (item.affirmative === 'Não') {
              setFormState(prev => ({
                ...prev,
                familyWithDiabetes: 0
              }))
            } else if (item.affirmative === 'Sim: mãe, pai, irmão ou filho.') {
              setFormState(prev => ({
                ...prev,
                familyWithDiabetes: 1
              }))
            } else {
              setFormState(prev => ({
                ...prev,
                familyWithDiabetes: 2
              }))
            }
          }}
          isError={formErros.familyWithDiabetesError}
        />


        <View style={styles.titleWrapper}>
          <Text
            style={[styles.title, { color: theme.colors.risk_obesidade }]}
          >
            Obesidade
          </Text>
        </View>
        <InputSelect
          options={[{
            affirmative: 'Sim',
          },
          {
            affirmative: 'Não',
          }
          ]}
          statement='É etilista?'
          onSelect={(prevItem, item) => {
            if (item.affirmative === 'Sim') {
              setFormState(prev => ({
                ...prev,
                isAlcoholic: true
              }))
            } else {
              setFormState(prev => ({
                ...prev,
                isAlcoholic: false
              }))
            }
          }}
          isError={formErros.isAlcoholicError}
        />
        <InputSelect
          options={[{
            affirmative: 'Sim',
          },
          {
            affirmative: 'Não',
          }
          ]}
          statement='Histórico de obesidade na família?'
          onSelect={(prevItem, item) => {
            if (item.affirmative === 'Sim') {
              setFormState(prev => ({
                ...prev,
                familyWithObesity: true
              }))
            } else {
              setFormState(prev => ({
                ...prev,
                familyWithObesity: false
              }))
            }
          }}
          isError={formErros.familyWithObesityError}
        />


        <View style={styles.titleWrapper}>
          <Text
            style={[styles.title, { color: theme.colors.risk_dpoc }]}
          >
            DPOC
          </Text>
        </View>
        <InputSelect
          options={[{
            affirmative: 'Grau 0: Sinto falta de ar apenas durante atividades muito intensas, como correr, subir ladeiras íngremes ou realizar exercícios vigorosos.',
          },
          {
            affirmative: 'Grau 1: Costumo sentir falta de ar quando ando apressado(a) no plano, subo uma ladeira leve ou realizo atividades que exijam um pequeno esforço físico.',
          },
          {
            affirmative: 'Grau 2: Ando mais devagar que outras pessoas da minha idade porque fico ofegante, ou preciso parar para respirar quando caminho no meu próprio ritmo.',
          },
          {
            affirmative: 'Grau 3: Costumo parar para respirar depois de andar poucos minutos no plano ou cerca de 100 metros. Às vezes, evito sair por medo de passar mal.',
          },
          {
            affirmative: 'Grau 4: Tenho tanta falta de ar que, muitas vezes, não consigo sair de casa. Atividades simples, como tomar banho, vestir-me ou comer, já me deixam exausto(a).',
          },
          ]}
          statement='Selecione a opção que mais se assemelha ao seu caso:'
          onSelect={(prevItem, item) => {
            if (item.affirmative.includes('Grau 0')) {
              setFormState(prev => ({
                ...prev,
                grauDispneia: 0
              }))
            } else if (item.affirmative.includes('Grau 1')) {
              setFormState(prev => ({
                ...prev,
                grauDispneia: 1
              }))
            } else if (item.affirmative.includes('Grau 2')) {
              setFormState(prev => ({
                ...prev,
                grauDispneia: 2
              }))
            } else if (item.affirmative.includes('Grau 3')) {
              setFormState(prev => ({
                ...prev,
                grauDispneia: 3
              }))
            } else if (item.affirmative.includes('Grau 5')) {
              setFormState(prev => ({
                ...prev,
                grauDispneia: 4
              }))
            } else {
              setFormState(prev => ({
                ...prev,
                grauDispneia: 5
              }))
            }
          }}
        />
        <InputSelect
          options={options0to5}
          statement="Responda essa e as próximas perguntas com uma nota de 0 a 5, considerando o quanto cada situação se aplica a você. Você sente que tosse com frequência, mesmo quando não está gripado(a)?"
          onSelect={(prevItem, item) => handleSelectDPOC(prevItem, item)}
        />

        <InputSelect
          options={options0to5}
          statement="Costuma perceber catarro, secreção ou muco acumulado no peito durante o dia?"
          onSelect={(prevItem, item) => handleSelectDPOC(prevItem, item)}
        />

        <InputSelect
          options={options0to5}
          statement="Sente aperto, pressão ou desconforto no peito em momentos de repouso ou esforço leve?"
          onSelect={(prevItem, item) => handleSelectDPOC(prevItem, item)}
        />

        <InputSelect
          options={options0to5}
          statement="Fica sem ar ou muito ofegante quando sobe uma ladeira, escadas ou anda por longas distâncias?"
          onSelect={(prevItem, item) => handleSelectDPOC(prevItem, item)}
        />

        <InputSelect
          options={options0to5}
          statement="Sua falta de ar interfere nas suas atividades diárias, como limpar a casa, cozinhar, trabalhar ou caminhar?"
          onSelect={(prevItem, item) => handleSelectDPOC(prevItem, item)}
        />

        <InputSelect
          options={options0to5}
          statement="Você se sente confiante em sair de casa, mesmo sabendo que pode ficar sem fôlego?"
          onSelect={(prevItem, item) => handleSelectDPOC(prevItem, item)}
        />

        <InputSelect
          options={options0to5}
          statement="A DPOC atrapalha o seu sono, fazendo você acordar por falta de ar, tosse ou desconforto respiratório?"
          onSelect={(prevItem, item) => handleSelectDPOC(prevItem, item)}
        />

        <InputSelect
          options={options0to5}
          statement="Você sente pouca energia, cansaço ou fraqueza física na maior parte do tempo devido aos sintomas respiratórios?"
          onSelect={(prevItem, item) => handleSelectDPOC(prevItem, item)}
        />
        <InputSelect
          options={[
            {
              affirmative: 'Nenhuma crise no último ano.',
            },
            {
              affirmative: 'Uma crise leve, tratada em casa ou com ajuda médica simples.',
            },
            {
              affirmative: 'Duas ou mais crises no último ano, com necessidade de medicação extra ou repouso prolongado.',
            },
            {
              affirmative: 'Tive pelo menos uma crise grave que exigiu internação hospitalar.',
            },
          ]}
          statement='Pense nos últimos 12 meses. Você teve algum episódio em que sua tosse, catarro ou falta de ar pioraram de forma súbita, exigindo medicação adicional ou atendimento médico? Marque a opção que mais se aproxima da sua realidade:'
          onSelect={(itemPrev, item) => {
            if (item.affirmative.includes('Nenhuma crise')) {
              setFormState(prev => ({
                ...prev,
                crisesDPOC: 0
              }))
            } else if (item.affirmative.includes('Uma crise leve')) {
              setFormState(prev => ({
                ...prev,
                crisesDPOC: 1
              }))
            } else if (item.affirmative.includes('Duas ou mais crises')) {
              setFormState(prev => ({
                ...prev,
                crisesDPOC: 2
              }))
            } else {
              setFormState(prev => ({
                ...prev,
                crisesDPOC: 3
              }))
            }
          }}
        />

        <View style={styles.titleWrapper}>
          <Text
            style={[styles.title, { color: theme.colors.risk_asma }]}
          >
            ASMA
          </Text>
        </View>
        <InputSelect
          options={[
            {
              affirmative: 'Sim',
            },
            {
              affirmative: 'Não',
            },
          ]}
          statement='Durante as últimas quatro semanas, você sentiu sintomas de asma, como tosse, chiado ou aperto no peito, mais de duas vezes por semana?'
          onSelect={(itemPrev, item) => {
            if (item.affirmative === 'Sim') {
              setFormState(prev => ({
                ...prev,
                sumAsma: prev.sumAsma + 1
              }))
            } else {
              setFormState(prev => ({
                ...prev,
                sumAsma: Math.max(0, prev.sumAsma - 1)
              }))
            }
          }}
        />
        <InputSelect
          options={[
            {
              affirmative: 'Sim',
            },
            {
              affirmative: 'Não',
            },

          ]}
          statement='Nos últimos 30 dias, você acordou durante a noite ou de madrugada por causa de sintomas da asma, como falta de ar, tosse ou chiado?'
          onSelect={(itemPrev, item) => {
            if (item.affirmative === 'Sim') {
              setFormState(prev => ({
                ...prev,
                sumAsma: prev.sumAsma + 1
              }))
            } else {
              setFormState(prev => ({
                ...prev,
                sumAsma: Math.max(0, prev.sumAsma - 1)
              }))
            }
          }}
        />
        <InputSelect
          options={[
            {
              affirmative: 'Sim',
            },
            {
              affirmative: 'Não',
            },

          ]}
          statement='A asma limitou suas atividades diárias (trabalho, escola, exercícios, tarefas domésticas ou lazer) em algum momento nas últimas quatro semanas?'
          onSelect={(itemPrev, item) => {
            if (item.affirmative === 'Sim') {
              setFormState(prev => ({
                ...prev,
                sumAsma: prev.sumAsma + 1
              }))
            } else {
              setFormState(prev => ({
                ...prev,
                sumAsma: Math.max(0, prev.sumAsma - 1)
              }))
            }
          }}
        />
        <InputSelect
          options={[
            {
              affirmative: 'Sim',
            },
            {
              affirmative: 'Não',
            },

          ]}
          statement='Você precisou usar sua medicação de alívio rápido (ex:bombinha) mais de duas vezes por semana nas últimas quatro semanas?'
          onSelect={(prevItem, item) => {
            if (item.affirmative === 'Sim') {
              setFormState(prev => ({
                ...prev,
                sumAsma: prev.sumAsma + 1
              }))
            } else {
              setFormState(prev => ({
                ...prev,
                sumAsma: Math.max(0, prev.sumAsma - 1)
              }))
            }
          }}
        />


        <View style={styles.titleWrapper}>
          <Text
            style={[styles.title, { color: theme.colors.risk_dor_cronica }]}
          >
            Dor crônica
          </Text>
        </View>
        <InputSelect
          options={[
            { affirmative: 'Raramente' },
            { affirmative: 'Às vezes' },
            { affirmative: 'Frequentemente' },
            { affirmative: 'Sempre' },
          ]}
          statement='Com que frequência você sente dor?'
          onSelect={(prevItem, item) => {
            const add =
              item.affirmative.includes('Às vezes') ? 1 :
                item.affirmative.includes('Frequentemente') ? 2 :
                  item.affirmative.includes('Sempre') ? 3 : 0

            const subtract =
              prevItem?.affirmative.includes('Às vezes') ? 1 :
                prevItem?.affirmative.includes('Frequentemente') ? 2 :
                  prevItem?.affirmative.includes('Sempre') ? 3 : 0

            setFormState(prev => ({
              ...prev,
              sumChronicPain: prev.sumChronicPain + add - subtract
            }))
          }}
        />

        <InputSelect
          options={[
            { affirmative: 'Nunca' },
            { affirmative: 'De vez em quando' },
            { affirmative: 'Muitas vezes' },
            { affirmative: 'Sempre' },
          ]}
          statement='Você sente queimação, choque ou formigamento?'
          onSelect={(prevItem, item) => {
            const add =
              item.affirmative.includes('De vez em quando') ? 1 :
                item.affirmative.includes('Muitas vezes') ? 2 :
                  item.affirmative.includes('Sempre') ? 3 : 0

            const subtract =
              prevItem?.affirmative.includes('De vez em quando') ? 1 :
                prevItem?.affirmative.includes('Muitas vezes') ? 2 :
                  prevItem?.affirmative.includes('Sempre') ? 3 : 0

            setFormState(prev => ({
              ...prev,
              sumChronicPain: prev.sumChronicPain + add - subtract
            }))
          }}
        />

        <InputSelect
          options={[
            { affirmative: 'Nunca' },
            { affirmative: 'Às vezes' },
            { affirmative: 'Quase sempre' },
            { affirmative: 'Sempre' },
          ]}
          statement='A dor atrapalha seu sono?'
          onSelect={(prevItem, item) => {
            const add =
              item.affirmative.includes('Às vezes') ? 1 :
                item.affirmative.includes('Quase sempre') ? 2 :
                  item.affirmative.includes('Sempre') ? 3 : 0

            const subtract =
              prevItem?.affirmative.includes('Às vezes') ? 1 :
                prevItem?.affirmative.includes('Quase sempre') ? 2 :
                  prevItem?.affirmative.includes('Sempre') ? 3 : 0

            setFormState(prev => ({
              ...prev,
              sumChronicPain: prev.sumChronicPain + add - subtract
            }))
          }}
        />

        <InputSelect
          options={[
            { affirmative: 'Não' },
            { affirmative: 'Um pouco' },
            { affirmative: 'Bastante' },
            { affirmative: 'Muito' },
          ]}
          statement='A dor piora com o toque, frio, calor ou movimento?'
          onSelect={(prevItem, item) => {
            const add =
              item.affirmative.includes('Um pouco') ? 1 :
                item.affirmative.includes('Bastante') ? 2 :
                  item.affirmative.includes('Muito') ? 3 : 0

            const subtract =
              prevItem?.affirmative.includes('Um pouco') ? 1 :
                prevItem?.affirmative.includes('Bastante') ? 2 :
                  prevItem?.affirmative.includes('Muito') ? 3 : 0

            setFormState(prev => ({
              ...prev,
              sumChronicPain: prev.sumChronicPain + add - subtract
            }))
          }}
        />

        <InputSelect
          options={[
            { affirmative: 'Não' },
            { affirmative: 'Um pouco' },
            { affirmative: 'Muito' },
            { affirmative: 'Totalmente' },
          ]}
          statement='A dor limita suas atividades do dia a dia?'
          onSelect={(prevItem, item) => {
            const add =
              item.affirmative.includes('Um pouco') ? 1 :
                item.affirmative.includes('Muito') ? 2 :
                  item.affirmative.includes('Totalmente') ? 3 : 0

            const subtract =
              prevItem?.affirmative.includes('Um pouco') ? 1 :
                prevItem?.affirmative.includes('Muito') ? 2 :
                  prevItem?.affirmative.includes('Totalmente') ? 3 : 0

            setFormState(prev => ({
              ...prev,
              sumChronicPain: prev.sumChronicPain + add - subtract
            }))
          }}
        />

        <InputSelect
          options={[
            { affirmative: 'Nunca' },
            { affirmative: 'Raramente' },
            { affirmative: 'Frequentemente' },
            { affirmative: 'Sempre' },
          ]}
          statement='Você sente dormência ou perda de sensibilidade na área da dor?'
          onSelect={(prevItem, item) => {
            const add =
              item.affirmative.includes('Raramente') ? 1 :
                item.affirmative.includes('Frequentemente') ? 2 :
                  item.affirmative.includes('Sempre') ? 3 : 0

            const subtract =
              prevItem?.affirmative.includes('Raramente') ? 1 :
                prevItem?.affirmative.includes('Frequentemente') ? 2 :
                  prevItem?.affirmative.includes('Sempre') ? 3 : 0

            setFormState(prev => ({
              ...prev,
              sumChronicPain: prev.sumChronicPain + add - subtract
            }))
          }}
        />

        <InputSelect
          options={[
            { affirmative: 'Nunca' },
            { affirmative: 'Às vezes' },
            { affirmative: 'Frequentemente' },
            { affirmative: 'Sempre' },
          ]}
          statement='Você tem sensação de peso, aperto ou pressão na área dolorida?'
          onSelect={(prevItem, item) => {
            const add =
              item.affirmative.includes('Às vezes') ? 1 :
                item.affirmative.includes('Frequentemente') ? 2 :
                  item.affirmative.includes('Sempre') ? 3 : 0

            const subtract =
              prevItem?.affirmative.includes('Às vezes') ? 1 :
                prevItem?.affirmative.includes('Frequentemente') ? 2 :
                  prevItem?.affirmative.includes('Sempre') ? 3 : 0

            setFormState(prev => ({
              ...prev,
              sumChronicPain: prev.sumChronicPain + add - subtract
            }))
          }}
        />

        <InputSelect
          options={[
            { affirmative: 'Não' },
            { affirmative: 'Pouco' },
            { affirmative: 'Bastante' },
            { affirmative: 'Muito' },
          ]}
          statement='A dor muda de intensidade durante o dia?'
          onSelect={(prevItem, item) => {
            const add =
              item.affirmative.includes('Pouco') ? 1 :
                item.affirmative.includes('Bastante') ? 2 :
                  item.affirmative.includes('Muito') ? 3 : 0

            const subtract =
              prevItem?.affirmative.includes('Pouco') ? 1 :
                prevItem?.affirmative.includes('Bastante') ? 2 :
                  prevItem?.affirmative.includes('Muito') ? 3 : 0

            setFormState(prev => ({
              ...prev,
              sumChronicPain: prev.sumChronicPain + add - subtract
            }))
          }}
        />

        <InputSelect
          options={[
            { affirmative: 'Nunca' },
            { affirmative: 'Raramente' },
            { affirmative: 'Às vezes' },
            { affirmative: 'Sim, sempre' },
          ]}
          statement='A dor melhora com remédios comuns (como dipirona e paracetamol)?'
          onSelect={(prevItem, item) => {
            const add =
              item.affirmative.includes('Raramente') ? 1 :
                item.affirmative.includes('Às vezes') ? 2 :
                  item.affirmative.includes('Sim, sempre') ? 3 : 0

            const subtract =
              prevItem?.affirmative.includes('Raramente') ? 1 :
                prevItem?.affirmative.includes('Às vezes') ? 2 :
                  prevItem?.affirmative.includes('Sim, sempre') ? 3 : 0

            setFormState(prev => ({
              ...prev,
              sumChronicPain: prev.sumChronicPain + add - subtract
            }))
          }}
        />

        <InputSelect
          options={[
            { affirmative: 'Nunca' },
            { affirmative: 'Às vezes' },
            { affirmative: 'Frequentemente' },
            { affirmative: 'Sempre' },
          ]}
          statement='A dor causa tristeza, irritação ou cansaço emocional?'
          onSelect={(prevItem, item) => {
            const add =
              item.affirmative.includes('Às vezes') ? 1 :
                item.affirmative.includes('Frequentemente') ? 2 :
                  item.affirmative.includes('Sempre') ? 3 : 0

            const subtract =
              prevItem?.affirmative.includes('Às vezes') ? 1 :
                prevItem?.affirmative.includes('Frequentemente') ? 2 :
                  prevItem?.affirmative.includes('Sempre') ? 3 : 0

            setFormState(prev => ({
              ...prev,
              sumChronicPain: prev.sumChronicPain + add - subtract
            }))
          }}
        />
      </View>
      <TouchableOpacity
        onPress={calculateRisk}
        style={styles.calculateTouchable}
      >
        <Text style={styles.touchableText}>Calcular</Text>
        <Icon
          iconLib='FontAwesome'
          iconName='long-arrow-right'
          size={20}
          color={theme.colors.white}
        />
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  calculateTouchable: {
    backgroundColor: theme.colors.blueDefault,
    borderRadius: 4,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'flex-end'
  },
  touchableText: {
    fontWeight: 700,
    fontSize: 16,
    color: theme.colors.white
  },
  formWrapper: {
    gap: 15
  },
  titleWrapper: {
    marginVertical: 15,

  },
  title: {
    fontSize: 16,
    fontWeight: 700
  }
});
