![Coders-Lab-1920px-no-background](https://user-images.githubusercontent.com/30623667/104709394-2cabee80-571f-11eb-9518-ea6a794e558e.png)


## Tworzenie tablicy – for

### Do tego zadania wykorzystaj pętlę for.

Napisz program, który na podstawie wartości zmiennej `n` utworzy tablicę jednowymiarową w zmiennej `numbers` zawierającą kolejne liczby całkowite od `1` do `n`.

### Podpowiedź

Do wstawiania wartości do tablicy skorzystaj z metody `push` np.: `array.push(2);`.


## Liczby parzyste i nieparzyste – for

### Do tego zadania wykorzystaj pętlę for

Napisz program, który na podstawie wartości zmiennej n wypisuje wszystkie liczby od `zera` do `n` (włącznie).

Przy każdej liczbie program ma napisać, czy liczba jest parzysta, czy nie:

```
0 – even
1 – odd
2 – even
3 – odd
itd.
```

### Podpowiedź

Jak sprawdzić, czy liczba jest parzysta lub nieparzysta?  
Należy podzielić ją modulo przez 2. Jeżeli wynik to 0, wtedy liczba jest parzysta, w przeciwnym przypadku jest nieparzysta. Skorzystaj z instrukcji "jeżeli".


## Tworzenie tablicy - while

### Do tego zadania wykorzystaj pętlę while

Napisz program, który utworzy tablicę jednowymiarową w zmiennej `numbers` zawierającą liczby, które są podzielne przez 3 oraz 5 jednocześnie, z zakresu od 0 do 100.

### Podpowiedź

Do wstawiania wartości do tablicy skorzystaj z metody `push` np.: `array.push(2);`.


## Formatowanie informacji z tablicy

### Do tego zadania wykorzystaj pętlę for-of

Napisz program który przeiteruje po tablicy obiektów reprezentujących osoby `people`, podczas iteracji zapisze w tablicy `result` informację o każdej której wiek jest powyżej 30 lat, jako string w formacie: `Imię Nazwisko - wiek 99 lat`

### Podpowiedź

Do sformatowania tekstu wykorzystaj template string.

Do wstawiania wartości do tablicy skorzystaj z metody `push` np.: `array.push(2);`.


## Wyświetlanie danych z tablicy

Napisz program, który **wypisze** w kolejnych liniach wartości (pojedyncze liczby) z przygotowanej tablicy dwuwymiarowej.

Wykorzystaj dwie zagnieżdżone w sobie pętle `for`.
Jako nazwy zmiennych liczników w pętlach `for` użyj kolejno: `i` i `j`.


## Tworzenie tablicy 2D

Napisz program, który w zmiennej `numbers` utworzy tablicę **wielowymiarową** zgodnie z wartościami w zmiennych `rows` i `columns`.

Elementami tablicy mają być **kolejne liczby całkowite zaczynając od 1**.

Użyj pętli `for` lub `while`.


## Tabliczka mnożenia

Napisz program tworzący tabliczkę mnożenia dla podanej zmiennej `n`.

Wyniki zapisz do tablicy **dwuwymiarowej** (w zmiennej `calc`).

Wartości (pojedyncze kolumny) w tej tablicy mają być tekstami obliczeń:

- Pierwszy rząd
  - `1 x 1 = 1`
  - `1 x 2 = 2`
  - `1 x 3 = 3`
- Drugi rząd
  - `2 x 1 = 2`
  - `2 x 2 = 4`
  - `2 x 3 = 6`
- itd.

W konsoli należy później wyświetlić całą tablicę `calc` odpowiednio formatując dane. **Wtedy należy dodać kreski pionowe!**.

Na przykład dla `n = 3` wynik **w konsoli** będzie następujący:

```
1 x 1 = 1 | 1 x 2 = 2 | 1 x 3 = 3
2 x 1 = 2 | 2 x 2 = 4 | 2 x 3 = 6
3 x 1 = 3 | 3 x 2 = 6 | 3 x 3 = 9
```

Każdą linię wyświetl **osobno** przy użyciu `console.log`.


## Średnia ocen

Napisz program, który na podstawie przygotowanej tablicy obiektów (`studentsData`), które zawierają informację na temat studentów (imię - właściwość `name`, oraz oceny z matematyki - właściwość `math`) obliczy średnią ocen z matematyki dla każdego ucznia. Informację zapisz w tablicy results jako następujący string: `Średnia ocena z matematyki studenta IMIĘ: ŚREDNIA`

Do iteracji po tablicach wykorzystaj pętle `for-of`.

### Podpowiedź

Do sformatowania tekstu wykorzystaj template string.

Do wstawiania wartości do tablicy skorzystaj z metody `push` np.: `array.push(2);`.


## Break

Napisz program, w którym wykorzystasz instrukcję `break`. Niech `break` przerwie działanie pętli, gdy `i` będzie miało wartość `5`.

Użyj:

```js
while (true) {
  // Tutaj wpisz kod zadania
}
```
