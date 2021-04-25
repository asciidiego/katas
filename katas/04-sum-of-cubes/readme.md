# Sum of Cubes

Pending to put description...

## Implementation

Pending to put into `clj` files...

```clojure
(ns sumofcubes.core)

(defn find-nb 
  ([m] (find-nb m 1))
  ([m d] 
   (cond (neg? m) -1
         (zero? m) (dec d)
         :else (recur (- m (*' d d d)) (inc d)))))
```

