 const DB_NAME = 'CalculatorDB';
        const DB_VERSION = 1;
        const STORE_NAME = 'Operations';
        let db;

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = function(event) {
            console.error("IndexedDB error:", event.target.errorCode);
        };

        request.onsuccess = function(event) {
            db = event.target.result;
            console.log("Database opened successfully");
            loadHistory();
        };

        request.onupgradeneeded = function(event) {
            db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
                console.log("Object store created");
            }
        };

        function saveOperation(operation) {
            if (!db) return;
            
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const objectStore = transaction.objectStore(STORE_NAME);
            const addRequest = objectStore.add(operation);

            addRequest.onsuccess = function() {
                console.log("Operation saved successfully");
            };

            addRequest.onerror = function() {
                console.error("Error saving operation");
            };
        }

        function loadHistory() {
            if (!db) return;
            
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const objectStore = transaction.objectStore(STORE_NAME);
            const lista = document.getElementById('lista');
            lista.innerHTML = ''; // Clear current list

            objectStore.openCursor().onsuccess = function(event) {
                const cursor = event.target.result;
                if (cursor) {
                    const operation = cursor.value;
                    const listItem = document.createElement("li");
                    listItem.style.fontSize = "20px";
                    listItem.innerHTML = `${operation.operando1} ${operation.operacao} ${operation.operando2} = ${operation.resultado}`;
                    lista.appendChild(listItem);
                    cursor.continue();
                }
            };
        }

        function clearHistory() {
            if (!db) return;
            
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const objectStore = transaction.objectStore(STORE_NAME);
            const clearRequest = objectStore.clear();

            clearRequest.onsuccess = function() {
                console.log("History cleared");
                document.getElementById('lista').innerHTML = '';
            };

            clearRequest.onerror = function() {
                console.error("Error clearing history");
            };
        }

        function createOperation(operando1, operando2, operacao, resultado) {
            const operation = {
                operando1: operando1,
                operando2: operando2,
                operacao: operacao,
                resultado: resultado,
                timestamp: new Date().toISOString()
            };
            saveOperation(operation);
            return operation;
        }

        function addToList(operation) {
            const listItem = document.createElement("li");
            listItem.style.fontSize = "20px";
            listItem.innerHTML = `${operation.operando1} ${operation.operacao} ${operation.operando2} = ${operation.resultado}`;
            document.getElementById('lista').appendChild(listItem);

        }
