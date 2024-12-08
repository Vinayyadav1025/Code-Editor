import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Taking input for the size of the vector
        System.out.print("Enter the size of the vector: ");
        int n = scanner.nextInt();

        int[] nums = new int[n];

        // Taking input for the elements of the vector
        System.out.print("Enter the elements of the vector: ");
        for (int i = 0; i < n; i++) {
            nums[i] = scanner.nextInt();
        }

        // Using HashMap to store the frequency of each number
        Map<Integer, Integer> frequencyMap = new HashMap<>();

        // Counting the frequency of each number
        for (int num : nums) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }

        // Variables to keep track of the number with the maximum frequency
        int maxNum = nums[0];
        int maxCount = frequencyMap.get(nums[0]);

        // Iterating through the frequency map to find the most frequent number
        for (Map.Entry<Integer, Integer> entry : frequencyMap.entrySet()) {
            int num = entry.getKey();
            int count = entry.getValue();
            if (count > maxCount || (count == maxCount && num > maxNum)) {
                maxCount = count;
                maxNum = num;
            }
        }

        // Printing the result
        System.out.println("The number that occurs the most is: " + maxNum + " with a count of: " + maxCount);
        
        scanner.close();
    }
}
