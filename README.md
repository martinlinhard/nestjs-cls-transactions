# Erkenntnisse

* Wenn Services orchestraten, wird nur ein @Transactional über jeder schreibenden Service-Methode (oder am besten über
  allen?) benötigt (sinnvollster Ansatz)
* @Transactional erstellt einen CLS Context, falls es keinen gibt!
* Bei run sollte isActive immer false sein (bewiesen mit 2 separaten Tests), damit wird immer ein neuer Context (und
  folglich auch eine transaktion) pro test erstellt
* Wenn man doppelt safe sein will, kann man theoretisch das ganze noch in einen runWith call wrappen (würde immer einen
  neuen context erstellen)