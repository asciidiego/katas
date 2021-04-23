(ns descending-order
 (:require [clojure.test :refer :all]))

(defn desc-order [n]
  ""
  (->> (str n)
    sort reverse
    (apply str)
    Integer/parseInt))

(deftest test-cases
  (are [n expected]
    (= expected (desc-order n))
    0		0
    1		1
    15		51))

(run-tests 'descending-order)
