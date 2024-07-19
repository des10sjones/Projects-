import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Calculator extends JFrame implements ActionListener {
    // Create a frame
    private JFrame frame;
    // Create a textfield
    private JTextField textField;
    // Store operator and operands
    private String operator;
    private double num1, num2, result;

    // Create constructor
    public Calculator() {
        frame = new JFrame("Calculator");
        textField = new JTextField();

        // Set frame layout
        frame.setLayout(new BorderLayout());

        // Add textfield to the frame
        frame.add(textField, BorderLayout.NORTH);
        textField.setEditable(false);

        // Create number buttons and add to the frame
        JPanel panel = new JPanel();
        panel.setLayout(new GridLayout(4, 4));
        String[] buttons = {
            "7", "8", "9", "/",
            "4", "5", "6", "*",
            "1", "2", "3", "-",
            "0", ".", "=", "+"
        };

        for (String text : buttons) {
            JButton button = new JButton(text);
            button.addActionListener(this);
            panel.add(button);
        }

        // Add panel to the frame
        frame.add(panel, BorderLayout.CENTER);

        // Set frame properties
        frame.setSize(400, 400);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }

    // Handle button click events
    @Override
    public void actionPerformed(ActionEvent e) {
        String command = e.getActionCommand();

        if ((command.charAt(0) >= '0' && command.charAt(0) <= '9') || command.equals(".")) {
            textField.setText(textField.getText() + command);
        } else if (command.equals("=")) {
            num2 = Double.parseDouble(textField.getText());
            switch (operator) {
                case "+":
                    result = num1 + num2;
                    break;
                case "-":
                    result = num1 - num2;
                    break;
                case "*":
                    result = num1 * num2;
                    break;
                case "/":
                    result = num1 / num2;
                    break;
            }
            textField.setText(String.valueOf(result));
        } else {
            if (!textField.getText().isEmpty()) {
                num1 = Double.parseDouble(textField.getText());
                operator = command;
                textField.setText("");
            }
        }
    }

    // Main function to run the calculator
    public static void main(String[] args) {
        new Calculator();
    }
}
