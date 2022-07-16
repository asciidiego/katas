(defn factorize 
  ([x f-init] (loop [n x
                     f f-init]
               (if (or (zero? n) (= n 1)) f
                   (let [[new-x new-f] (cond (or (zero? n) (= n 1)) [n f]
                                             (zero? (mod n 2)) [(/ n 2) (conj f 2)]
                                             :else (loop [p 3]
                                                     (if (zero? (mod n p))
                                                         [(/ n p) (conj f p)]
                                                         (recur (+ p 2)))))]
                     (recur new-x new-f)))))
  ([n] (factorize n [])))
