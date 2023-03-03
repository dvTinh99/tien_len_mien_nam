<?php 
function shuffleCards() {
   // Tạo mảng chứa 52 lá bài
   $cards = array();
   for ($i = 0; $i < 52; $i++) {
      $cards[$i] = $i;
   }
   
   // Phân phối lá bài cho 4 người chơi
   $players = array(array(),array(),array(),array());
   $j = 0;
   while ($j < 52) {
      for ($i = 0; $i < 4; $i++) {
         if ($j >= 52) break;
         $players[$i][] = $cards[$j++];
      }
   }
   
   // Xếp lại các lá bài theo thứ tự giá trị
   for ($i = 0; $i < 4; $i++) {
      sort($players[$i]);
   }

   return $players;
}