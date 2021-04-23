(ns kata
  (:require [clojure.test :refer :all]))

(def solution clojure.string/ends-with?)

(deftest test-words
  (is (= (solution "samurai" "ai") true))
  (is (= (solution "sumo" "omo") false))
  (is (= (solution "ninja" "ja") true))
  (is (= (solution "sensei" "i") true))
  (is (= (solution "samurai" "ra") false))
  (is (= (solution "abc" "abcd") false))
  (is (= (solution "abc" "abc") true))
  (is (= (solution "abcabc" "bc") true))
  (is (= (solution "ails" "fails") false))
  (is (= (solution "fails" "ails") true))
  (is (= (solution "this" "fails") false))
  (is (= (solution "abc" "") true))
  (is (= (solution ":-)" ":-(") false))
  (is (= (solution "!@#$%^&*() :-)" ":-)") true))
  (is (= (solution "abc\n" "abc") false))
)

(run-tests 'kata)
