# Матрица трассируемости требований

Документ связывает бизнес-требования, критерии приёмки, функциональные и нефункциональные требования, User Stories и тест-кейсы. Формулировки требований не дублируются — приведены только идентификаторы.

**Источники:** [БТ и КП-БТ](requirements/business.md) · [ФТ и КП-ФТ](requirements/functional.md) · [НФТ и КП-НФТ](requirements/non-functional.md) · [User Stories](user-stories.md) · [Тест-кейсы](tests/test-cases.md).

## Расширенная матрица БТ → КП-БТ → ФТ/КП-ФТ → НФТ/КП-НФТ → US → тесты

| БТ | КП-БТ | ФТ | КП-ФТ | НФТ | КП-НФТ | US | Тесты T / TN | Ответственные (из старой матрицы) |
|---|---|---|---|---|---|---|---|---|
| [БТ‑01](requirements/business.md#bt-01) | [КП-БТ‑01](requirements/business.md#kp-bt-01) | ФТ‑01, ФТ‑27 | [КП-ФТ‑27](requirements/functional.md#kp-ft-27) | НФТ‑01, НФТ‑02, НФТ‑08 | [КП-НФТ‑01](requirements/non-functional.md#kp-nft-01), [КП-НФТ‑02](requirements/non-functional.md#kp-nft-02), [КП-НФТ‑08](requirements/non-functional.md#kp-nft-08) | US-01 | [T-01](tests/test-cases.md), [T-25](tests/test-cases.md), [TN-01](tests/test-cases.md), [TN-02](tests/test-cases.md), [TN-08](tests/test-cases.md) | Бизнес-аналитик, владелец продукта |
| [БТ‑02](requirements/business.md#bt-02) | [КП-БТ‑02](requirements/business.md#kp-bt-02) | ФТ‑02 | — | НФТ‑03 | [КП-НФТ‑03](requirements/non-functional.md#kp-nft-03) | US-02 | [T-02](tests/test-cases.md), [TN-03](tests/test-cases.md) | Бизнес-аналитик |
| [БТ‑03](requirements/business.md#bt-03) | [КП-БТ‑03](requirements/business.md#kp-bt-03) | ФТ‑03 | — | НФТ‑03 | [КП-НФТ‑03](requirements/non-functional.md#kp-nft-03) | US-03 | [T-03](tests/test-cases.md), [TN-03](tests/test-cases.md) | Бизнес-аналитик, владелец продукта |
| [БТ‑04](requirements/business.md#bt-04) | [КП-БТ‑04](requirements/business.md#kp-bt-04) | ФТ‑04 | — | — | — | US-04 | [T-04](tests/test-cases.md) | Бизнес-аналитик, CTO |
| [БТ‑05](requirements/business.md#bt-05) | [КП-БТ‑05](requirements/business.md#kp-bt-05) | ФТ‑05 | — | НФТ‑06, НФТ‑08 | [КП-НФТ‑06](requirements/non-functional.md#kp-nft-06), [КП-НФТ‑08](requirements/non-functional.md#kp-nft-08) | US-05 | [T-05](tests/test-cases.md), [TN-06](tests/test-cases.md), [TN-08](tests/test-cases.md) | Бизнес-аналитик, владелец продукта |
| [БТ‑06](requirements/business.md#bt-06) | [КП-БТ‑06](requirements/business.md#kp-bt-06) | ФТ‑06 | — | — | — | US-06 | [T-06](tests/test-cases.md) | Бизнес-аналитик |
| [БТ‑07](requirements/business.md#bt-07) | [КП-БТ‑07](requirements/business.md#kp-bt-07) | ФТ‑07 | — | — | — | US-06 | [T-07](tests/test-cases.md) | Бизнес-аналитик |
| [БТ‑08](requirements/business.md#bt-08) | [КП-БТ‑08](requirements/business.md#kp-bt-08) | ФТ‑08, ФТ‑28 | [КП-ФТ‑28](requirements/functional.md#kp-ft-28) | НФТ‑06, НФТ‑08 | [КП-НФТ‑06](requirements/non-functional.md#kp-nft-06), [КП-НФТ‑08](requirements/non-functional.md#kp-nft-08) | US-07 | [T-08](tests/test-cases.md), [T-26](tests/test-cases.md), [TN-06](tests/test-cases.md), [TN-08](tests/test-cases.md) | Бизнес-аналитик, CTO |
| [БТ‑09](requirements/business.md#bt-09) | [КП-БТ‑09](requirements/business.md#kp-bt-09) | ФТ‑09 | — | — | — | US-07 | [T-09](tests/test-cases.md) | Бизнес-аналитик |
| [БТ‑10](requirements/business.md#bt-10) | [КП-БТ‑10](requirements/business.md#kp-bt-10) | ФТ‑10, ФТ‑11 | [КП-ФТ‑11](requirements/functional.md#kp-ft-11) | — | — | US-07 | [T-10](tests/test-cases.md), [T-23](tests/test-cases.md) | Бизнес-аналитик, CTO |
| [БТ‑11](requirements/business.md#bt-11) | [КП-БТ‑11](requirements/business.md#kp-bt-11) | ФТ‑12 | — | — | — | US-08 | [T-11](tests/test-cases.md) | Бизнес-аналитик, владелец продукта |
| [БТ‑12](requirements/business.md#bt-12) | [КП-БТ‑12](requirements/business.md#kp-bt-12) | ФТ‑13 | — | НФТ‑01, НФТ‑02, НФТ‑03, НФТ‑08 | [КП-НФТ‑01](requirements/non-functional.md#kp-nft-01), [КП-НФТ‑02](requirements/non-functional.md#kp-nft-02), [КП-НФТ‑03](requirements/non-functional.md#kp-nft-03), [КП-НФТ‑08](requirements/non-functional.md#kp-nft-08) | US-09 | [T-12](tests/test-cases.md), [TN-01](tests/test-cases.md), [TN-02](tests/test-cases.md), [TN-03](tests/test-cases.md), [TN-08](tests/test-cases.md) | Владелец продукта, бизнес-аналитик |
| [БТ‑13](requirements/business.md#bt-13) | [КП-БТ‑13](requirements/business.md#kp-bt-13) | ФТ‑14 | — | НФТ‑03, НФТ‑04 | [КП-НФТ‑03](requirements/non-functional.md#kp-nft-03), [КП-НФТ‑04](requirements/non-functional.md#kp-nft-04) | US-10 | [T-13](tests/test-cases.md), [TN-03](tests/test-cases.md), [TN-04](tests/test-cases.md) | Бизнес-аналитик, CTO |
| [БТ‑14](requirements/business.md#bt-14) | [КП-БТ‑14](requirements/business.md#kp-bt-14) | ФТ‑15 | — | НФТ‑03, НФТ‑04 | [КП-НФТ‑03](requirements/non-functional.md#kp-nft-03), [КП-НФТ‑04](requirements/non-functional.md#kp-nft-04) | US-10 | [T-14](tests/test-cases.md), [TN-03](tests/test-cases.md), [TN-04](tests/test-cases.md) | Бизнес-аналитик, CTO |
| [БТ‑15](requirements/business.md#bt-15) | [КП-БТ‑15](requirements/business.md#kp-bt-15) | ФТ‑16 | — | — | — | US-11 | [T-15](tests/test-cases.md) | CTO, бизнес-аналитик |
| [БТ‑16](requirements/business.md#bt-16) | [КП-БТ‑16](requirements/business.md#kp-bt-16) | ФТ‑17 | — | НФТ‑03 | [КП-НФТ‑03](requirements/non-functional.md#kp-nft-03) | US-12 | [T-16](tests/test-cases.md), [TN-03](tests/test-cases.md) | Бизнес-аналитик, владелец продукта |
| [БТ‑17](requirements/business.md#bt-17) | [КП-БТ‑17](requirements/business.md#kp-bt-17) | ФТ‑18, ФТ‑19, ФТ‑20, ФТ‑21 | [КП-ФТ‑21](requirements/functional.md#kp-ft-21) | НФТ‑01, НФТ‑02, НФТ‑05, НФТ‑07 | [КП-НФТ‑01](requirements/non-functional.md#kp-nft-01), [КП-НФТ‑02](requirements/non-functional.md#kp-nft-02), [КП-НФТ‑05](requirements/non-functional.md#kp-nft-05), [КП-НФТ‑07](requirements/non-functional.md#kp-nft-07) | US-13 | [T-17](tests/test-cases.md), [T-24](tests/test-cases.md), [TN-01](tests/test-cases.md), [TN-02](tests/test-cases.md), [TN-05](tests/test-cases.md), [TN-07](tests/test-cases.md) | Бизнес-аналитик, владелец продукта |
| [БТ‑18](requirements/business.md#bt-18) | [КП-БТ‑18](requirements/business.md#kp-bt-18) | ФТ‑22 | — | НФТ‑01, НФТ‑02, НФТ‑05, НФТ‑07 | [КП-НФТ‑01](requirements/non-functional.md#kp-nft-01), [КП-НФТ‑02](requirements/non-functional.md#kp-nft-02), [КП-НФТ‑05](requirements/non-functional.md#kp-nft-05), [КП-НФТ‑07](requirements/non-functional.md#kp-nft-07) | US-14 | [T-18](tests/test-cases.md), [TN-01](tests/test-cases.md), [TN-02](tests/test-cases.md), [TN-05](tests/test-cases.md), [TN-07](tests/test-cases.md) | Бизнес-аналитик, CTO |
| [БТ‑19](requirements/business.md#bt-19) | [КП-БТ‑19](requirements/business.md#kp-bt-19) | ФТ‑23 | — | НФТ‑05 | [КП-НФТ‑05](requirements/non-functional.md#kp-nft-05) | US-15 | [T-19](tests/test-cases.md), [TN-05](tests/test-cases.md) | Владелец продукта, менеджер проекта |
| [БТ‑20](requirements/business.md#bt-20) | [КП-БТ‑20](requirements/business.md#kp-bt-20) | ФТ‑24 | — | НФТ‑04 | [КП-НФТ‑04](requirements/non-functional.md#kp-nft-04) | US-16 | [T-20](tests/test-cases.md), [TN-04](tests/test-cases.md) | Бизнес-аналитик, владелец продукта |
| [БТ‑21](requirements/business.md#bt-21) | [КП-БТ‑21](requirements/business.md#kp-bt-21) | ФТ‑25 | — | НФТ‑06 | [КП-НФТ‑06](requirements/non-functional.md#kp-nft-06) | US-17 | [T-21](tests/test-cases.md), [TN-06](tests/test-cases.md) | Владелец продукта, бизнес-аналитик |
| [БТ‑22](requirements/business.md#bt-22) | [КП-БТ‑22](requirements/business.md#kp-bt-22) | ФТ‑26 | — | НФТ‑06 | [КП-НФТ‑06](requirements/non-functional.md#kp-nft-06) | US-18 | [T-22](tests/test-cases.md), [TN-06](tests/test-cases.md) | Владелец продукта, бизнес-аналитик, CTO |

**Правило чтения:** строка соответствует одному БТ. НФТ может относиться сразу к нескольким БТ, а одна US — объединять несколько БТ, поэтому идентификаторы повторяются. Для ФТ без собственного КП-ФТ применяется критерий КП-БТ родительского БТ. Тест T на КП-БТ покрывает сам критерий; дополнительные T проверяют только отдельные КП-ФТ.

## Контроль покрытия

| Объект | Количество в источниках | Отражено в матрице |
|---|---:|---:|
| БТ | 22 | 22 |
| КП-БТ | 22 | 22 |
| ФТ | 28 | 28 |
| КП-ФТ | 4 | 4 |
| НФТ | 8 | 8 |
| КП-НФТ | 8 | 8 |
| US | 18 | 18 |
| T | 26 | 26 |
| TN | 8 | 8 |

Все 22 БТ связаны хотя бы с одной US и функциональным требованием. Все 18 US включены в матрицу. Нет ФТ или НФТ без связанного БТ.
