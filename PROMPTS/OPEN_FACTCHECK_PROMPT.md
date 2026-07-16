# Prompt för lokal dubbelkontroll av källor

## Kontext

Den här prompten användes för en extra dubbelkontroll av källorna bakom partiernas kodade svar. Kontrollen kördes i en lokalt körd agent med den öppna modellen `ornith:35b`, separat från det huvudsakliga Codex-arbetet. Syftet var att hitta möjliga konflikter, svaga belägg eller frågor som inte faktiskt behandlades i den angivna källan, så att dessa kunde granskas manuellt.

Prompten återges nedan som den användes.

## Prompt

```text
This is a handmade poltitcal compass for swedish arties. I have let GPT-5.5 check party sources and assign answers to
all questions for which it could find a source, but I'm not sure it hasn't hallucinated. Therefore I want you to
check all parties answers in parties.ts and compare to the provided sources, to see if the source backs up the answer
properly or not. You should not correct or adjust any answer, simply flag/remember all conflicting party/answer pairs
in a separate file with the source and a pointer to where in the source you think the conflicting fact lies, or a
note if there is simply no mention of the question at hand in the source, and I'll check them manually from there.

I do this just to avoid manually going through all the parties every answer since I suspect the vast majority are
correct.

The questions, you find in questions.ts.

Take as long as you want, and if you need me to assist you with web access or file access, let me know. Also let me
know if anything is unclear in my instructions.
```
